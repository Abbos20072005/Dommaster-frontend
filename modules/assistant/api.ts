import { isAxiosError } from 'axios';

import { api } from '@/utils/api/instance';

import type {
  AssistantErrorKind,
  AssistantMessage,
  AssistantProduct,
  AssistantReply
} from './types';

import { ASSISTANT_MOCK } from './config';
import { mockAssistantReply } from './mock';
import { AssistantError } from './types';

/**
 * The chat endpoints (BLD-400):
 *   POST /assistant/chat/                  { message, conversation_id?, platform }  → one answer
 *   GET  /assistant/conversations/<id>/    the messages of a chat (to open it again)
 * and the WebSocket `/ws/assistant/` for the answer that comes in piece by piece (see `socket.ts`).
 */
export interface ChatResult {
  conversation_id: number;
  message_id: number;
  question: { id: number; text: string; pii_masked: boolean };
  text: string;
  operator: boolean;
  products?: AssistantProduct[];
}

interface ChatResponse {
  result: ChatResult;
}

interface ConversationResponse {
  result: {
    conversation_id: number;
    messages: {
      id: number;
      role: 'assistant' | 'user';
      text: string;
      pii_masked: boolean;
      operator: boolean;
      created_at: string;
      products?: AssistantProduct[];
    }[];
  };
}

/** The answer shows up to this many cards (the server sends 0–8). */
const MAX_PRODUCTS = 8;

export const toReply = (result: ChatResult): AssistantReply => ({
  conversationId: result.conversation_id,
  messageId: result.message_id,
  questionText: result.question?.text,
  piiMasked: !!result.question?.pii_masked,
  text: result.text,
  products: (result.products ?? []).slice(0, MAX_PRODUCTS),
  handoff: !!result.operator
});

/**
 * The screen of an error follows its `error_code`, not the HTTP status (42 and 44 are both 429,
 * 41 and 43 both 503): 41 off or out of budget, 42 the day is over, 43 the AI did not answer,
 * 44 too many in a minute, 5 a bad question.
 */
export const kindOfCode = (code: unknown, status?: number): AssistantErrorKind => {
  if (code === 41) return 'disabled';
  if (code === 42) return 'limit';
  if (code === 44) return 'rate';
  if (code === 43 || code === 5) return 'generic';
  if (status === 503) return 'disabled';
  if (status === 429) return 'rate';
  return 'generic';
};

const toAssistantError = (error: unknown) => {
  if (error instanceof AssistantError) return error;

  if (isAxiosError(error)) {
    if (!error.response) return new AssistantError('offline');
    const data = error.response.data as { error_code?: number } | undefined;
    return new AssistantError(kindOfCode(data?.error_code, error.response.status));
  }

  return new AssistantError('generic');
};

export const sendAssistantMessage = async ({
  message,
  conversationId,
  signal
}: {
  message: string;
  conversationId?: number;
  signal?: AbortSignal;
}): Promise<AssistantReply> => {
  if (ASSISTANT_MOCK) return mockAssistantReply(message);

  if (typeof navigator !== 'undefined' && !navigator.onLine) throw new AssistantError('offline');

  try {
    const { data } = await api.post<ChatResponse>(
      '/assistant/chat/',
      { message, conversation_id: conversationId, platform: 'site' },
      { signal }
    );
    return toReply(data.result);
  } catch (error) {
    throw toAssistantError(error);
  }
};

/**
 * The messages of a chat, oldest first. `null`: the chat is not there (another customer's or a
 * deleted one): a new one is started. Any other failure throws, and the saved copy stays.
 */
export const loadConversation = async (
  id: number,
  signal?: AbortSignal
): Promise<AssistantMessage[] | null> => {
  try {
    const { data } = await api.get<ConversationResponse>(`/assistant/conversations/${id}/`, {
      signal
    });

    return data.result.messages.map((message) => ({
      id: String(message.id),
      role: message.role,
      text: message.text,
      time: message.created_at,
      masked: message.role === 'user' ? message.pii_masked : undefined,
      handoff: message.role === 'assistant' ? message.operator : undefined,
      products: message.role === 'assistant' ? message.products : undefined
    }));
  } catch (error) {
    // the shared client turns a 404 into Next's "not found" error: both mean "no such chat"
    const digest = (error as { digest?: unknown })?.digest;
    const notFound =
      (isAxiosError(error) && error.response?.status === 404) ||
      (typeof digest === 'string' && digest.includes('404'));
    if (notFound) return null;
    throw error;
  }
};
