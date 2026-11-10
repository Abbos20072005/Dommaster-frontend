'use client';

import React from 'react';

import { trackEvent } from '@/lib/analytics';

import type { AssistantErrorKind, AssistantMessage } from './types';

import { sendAssistantMessage } from './api';
import { maskSensitive } from './mask';
import { AssistantError } from './types';

const STORAGE_KEY = 'buildex:assistant';
const MAX_MESSAGES = 60;

interface Saved {
  messages: AssistantMessage[];
  sessionId?: string;
}

const read = (): Saved => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : { messages: [] };
  } catch {
    return { messages: [] };
  }
};

const write = (saved: Saved) => {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...saved, messages: saved.messages.slice(-MAX_MESSAGES) })
    );
  } catch {
    // no storage (a private window): the chat just starts empty next time
  }
};

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

/**
 * The state of the conversation: messages, the wait for an answer and why the last question failed.
 * The messages live in `sessionStorage`, so closing and opening the window (or going to another
 * page) keeps them; "new chat" clears them.
 */
export const useAssistant = () => {
  const [messages, setMessages] = React.useState<AssistantMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AssistantErrorKind | null>(null);
  // the answer that came in this visit: its text is written out letter by letter
  const [arrivedId, setArrivedId] = React.useState<string | null>(null);
  const sessionId = React.useRef<string | undefined>(undefined);
  const abort = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    const saved = read();
    setMessages(saved.messages);
    sessionId.current = saved.sessionId;
    // the last question was not answered before the page was left: "try again" is offered again
    if (saved.messages.at(-1)?.failed) setError('generic');
    return () => abort.current?.abort();
  }, []);

  const commit = React.useCallback((next: AssistantMessage[]) => {
    setMessages(next);
    write({ messages: next, sessionId: sessionId.current });
  }, []);

  const ask = React.useCallback(
    async (history: AssistantMessage[], question: string) => {
      setLoading(true);
      setError(null);
      abort.current?.abort();
      abort.current = new AbortController();

      try {
        const reply = await sendAssistantMessage({
          message: question,
          sessionId: sessionId.current,
          signal: abort.current.signal
        });
        sessionId.current = reply.sessionId ?? sessionId.current;
        const id = uid();
        commit([
          ...history.map((message) =>
            message.failed ? { ...message, failed: false } : message
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
        setArrivedId(id);
      } catch (caught) {
        if (abort.current?.signal.aborted) return;
        const kind = caught instanceof AssistantError ? caught.kind : 'generic';
        setError(kind);
        // the last question stays in the chat, marked as not sent
        commit(
          history.map((message, index) =>
            index === history.length - 1 ? { ...message, failed: true } : message
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [commit]
  );

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
      commit(history);
      trackEvent('assistant_question', { question_length: typed.length });
      void ask(history, text);
    },
    [ask, commit, loading, messages]
  );

  const retry = React.useCallback(() => {
    if (loading) return;
    const last = messages.at(-1);
    if (last?.role !== 'user') return;
    void ask(messages, last.text);
  }, [ask, loading, messages]);

  const reset = React.useCallback(() => {
    abort.current?.abort();
    sessionId.current = undefined;
    setLoading(false);
    setError(null);
    setArrivedId(null);
    commit([]);
  }, [commit]);

  /** The customer's mark of an answer (optional): kept in the chat and counted in GA4. */
  const rate = React.useCallback(
    (id: string, rating: 'down' | 'up') => {
      commit(
        messages.map((message) =>
          message.id === id && !message.rating ? { ...message, rating } : message
        )
      );
      trackEvent('assistant_feedback', { rating });
    },
    [commit, messages]
  );

  /** Why the answer was bad: one of the reason chips under a thumbs-down. */
  const giveReason = React.useCallback(
    (id: string, reason: string) => {
      commit(
        messages.map((message) =>
          message.id === id && !message.reason ? { ...message, reason } : message
        )
      );
      trackEvent('assistant_feedback_reason', { reason });
    },
    [commit, messages]
  );

  return { messages, loading, error, arrivedId, send, retry, reset, rate, giveReason };
};
