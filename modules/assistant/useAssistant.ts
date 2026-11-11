'use client';

import React from 'react';

import { trackEvent } from '@/lib/analytics';

import type { AssistantErrorKind, AssistantMessage, AssistantReply } from './types';

import { loadConversation, sendAssistantMessage } from './api';
import { ASSISTANT_MOCK } from './config';
import { maskSensitive } from './mask';
import { askViaSocket, closeAssistantSocket, SocketUnavailable } from './socket';
import { AssistantError } from './types';

const MESSAGES_KEY = 'buildex:assistant';
const CONVERSATION_KEY = 'buildex:assistant:conversation';
const MAX_MESSAGES = 60;

interface Saved {
  messages: AssistantMessage[];
  conversationId?: number;
}

const read = (): Saved => {
  try {
    const raw = sessionStorage.getItem(MESSAGES_KEY);
    const id = Number(localStorage.getItem(CONVERSATION_KEY));
    const messages = (raw ? (JSON.parse(raw) as AssistantMessage[]) : []).filter(
      (message) => !message.streaming
    );
    return { messages, conversationId: id || undefined };
  } catch {
    return { messages: [] };
  }
};

const write = ({ messages, conversationId }: Saved) => {
  try {
    sessionStorage.setItem(
      MESSAGES_KEY,
      JSON.stringify(messages.filter((message) => !message.streaming).slice(-MAX_MESSAGES))
    );
    if (conversationId) localStorage.setItem(CONVERSATION_KEY, String(conversationId));
    else localStorage.removeItem(CONVERSATION_KEY);
  } catch {
    // no storage (a private window): the chat starts empty next time
  }
};

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

/**
 * The state of the conversation: messages, the wait for an answer and why the last question failed.
 * The question goes through the WebSocket (the answer is written piece by piece) and, when the
 * socket cannot be used, by HTTP. The id of the chat is kept for the next visit and the messages
 * are loaded from the server when the window opens again; "new chat" forgets the id.
 */
export const useAssistant = () => {
  const [messages, setMessages] = React.useState<AssistantMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [error, setError] = React.useState<AssistantErrorKind | null>(null);
  // the answer that came in as a whole (HTTP): its text is written out letter by letter
  const [arrivedId, setArrivedId] = React.useState<string | null>(null);
  const conversationId = React.useRef<number | undefined>(undefined);
  const abort = React.useRef<AbortController | null>(null);
  const ready = React.useRef(false);
  const touched = React.useRef(false);

  React.useEffect(() => {
    const saved = read();
    conversationId.current = saved.conversationId;
    setMessages(saved.messages);
    // the last question was not answered before the page was left: "try again" is offered again
    if (saved.messages.at(-1)?.failed) setError('generic');
    ready.current = true;

    const history = new AbortController();
    if (saved.conversationId && !ASSISTANT_MOCK) {
      loadConversation(saved.conversationId, history.signal)
        .then((server) => {
          // a question was asked meanwhile: the messages on the screen are newer
          if (touched.current) return;
          if (server === null) {
            conversationId.current = undefined;
            setMessages([]);
            setError(null);
            return;
          }
          const last = saved.messages.at(-1);
          setMessages(last?.failed ? [...server, last] : server);
        })
        .catch(() => {
          // the server did not answer: the saved copy stays
        });
    }

    return () => {
      history.abort();
      abort.current?.abort();
      closeAssistantSocket();
    };
  }, []);

  React.useEffect(() => {
    if (ready.current) write({ messages, conversationId: conversationId.current });
  }, [messages]);

  const ask = React.useCallback(async (history: AssistantMessage[], question: string) => {
    setLoading(true);
    setError(null);
    setSearching(false);
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;

    const userId = history.at(-1)?.id;
    let streamId: string | null = null;
    let streamed = false;

    const patchUser = (patch: Partial<AssistantMessage>) =>
      setMessages((previous) =>
        previous.map((message) => (message.id === userId ? { ...message, ...patch } : message))
      );

    try {
      let reply: AssistantReply;

      try {
        if (ASSISTANT_MOCK) throw new SocketUnavailable();

        reply = await askViaSocket(
          { message: question, conversationId: conversationId.current },
          {
            onStart: ({ conversationId: id, questionText, piiMasked }) => {
              conversationId.current = id;
              // the customer's bubble shows the question as the server saved it (a card is hidden)
              setMessages((previous) =>
                previous.map((message) =>
                  message.id === userId
                    ? {
                        ...message,
                        text: questionText || message.text,
                        masked: message.masked || piiMasked
                      }
                    : message
                )
              );
            },
            onTool: () => setSearching(true),
            onDelta: (chunk) => {
              streamed = true;
              setSearching(false);
              setMessages((previous) => {
                const last = previous.at(-1);
                if (last?.role === 'assistant' && last.streaming) {
                  return [...previous.slice(0, -1), { ...last, text: last.text + chunk }];
                }
                streamId = uid();
                return [
                  ...previous,
                  {
                    id: streamId,
                    role: 'assistant',
                    text: chunk,
                    time: new Date().toISOString(),
                    streaming: true
                  }
                ];
              });
            }
          },
          controller.signal
        );
      } catch (caught) {
        // no socket (or it closed before the answer began): the same question goes by HTTP
        if (!(caught instanceof SocketUnavailable)) throw caught;
        reply = await sendAssistantMessage({
          message: question,
          conversationId: conversationId.current,
          signal: controller.signal
        });
      }

      conversationId.current = reply.conversationId ?? conversationId.current;
      const id = streamId ?? (reply.messageId ? String(reply.messageId) : uid());

      setMessages((previous) => [
        ...previous
          .filter((message) => !message.streaming)
          .map((message) =>
            message.id === userId
              ? {
                  ...message,
                  failed: false,
                  text: reply.questionText || message.text,
                  masked: message.masked || reply.piiMasked
                }
              : message.failed
                ? { ...message, failed: false }
                : message
          ),
        {
          id,
          role: 'assistant',
          text: reply.text,
          time: new Date().toISOString(),
          products: reply.products,
          suggestions: reply.suggestions,
          source: reply.source,
          handoff: reply.handoff,
          notFound: reply.notFound,
          hasMore: reply.hasMore,
          query: question
        }
      ]);
      if (!streamed) setArrivedId(id);
    } catch (caught) {
      if (controller.signal.aborted) return;
      setError(caught instanceof AssistantError ? caught.kind : 'generic');
      // the last question stays in the chat, marked as not sent
      setMessages((previous) =>
        previous
          .filter((message) => !message.streaming)
          .map((message) => (message.id === userId ? { ...message, failed: true } : message))
      );
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }, []);

  const send = React.useCallback(
    (raw: string) => {
      const typed = raw.trim();
      if (!typed || loading) return;

      // a card number or an SMS code never leaves the browser
      const { text, masked } = maskSensitive(typed);
      const history: AssistantMessage[] = [
        ...messages,
        { id: uid(), role: 'user', text, time: new Date().toISOString(), masked }
      ];
      touched.current = true;
      setMessages(history);
      trackEvent('assistant_question', { question_length: typed.length });
      void ask(history, text);
    },
    [ask, loading, messages]
  );

  const retry = React.useCallback(() => {
    if (loading) return;
    const last = messages.at(-1);
    if (last?.role !== 'user') return;
    touched.current = true;
    void ask(messages, last.text);
  }, [ask, loading, messages]);

  const reset = React.useCallback(() => {
    abort.current?.abort();
    closeAssistantSocket();
    conversationId.current = undefined;
    touched.current = true;
    setLoading(false);
    setSearching(false);
    setError(null);
    setArrivedId(null);
    setMessages([]);
  }, []);

  /** The customer's mark of an answer (optional): kept in the chat and counted in GA4. */
  const rate = React.useCallback((id: string, rating: 'down' | 'up') => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === id && !message.rating ? { ...message, rating } : message
      )
    );
    trackEvent('assistant_feedback', { rating });
  }, []);

  /** Why the answer was bad: one of the reason chips under a thumbs-down. */
  const giveReason = React.useCallback((id: string, reason: string) => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === id && !message.reason ? { ...message, reason } : message
      )
    );
    trackEvent('assistant_feedback_reason', { reason });
  }, []);

  return {
    messages,
    loading,
    searching,
    error,
    arrivedId,
    send,
    retry,
    reset,
    rate,
    giveReason
  };
};
