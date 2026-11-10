import { isAxiosError } from 'axios';

import { publicApi } from '@/utils/api/instance';

import type { AssistantProduct, AssistantReply, AssistantSource } from './types';

import { ASSISTANT_MOCK } from './config';
import { mockAssistantReply } from './mock';
import { AssistantError } from './types';

/**
 * The chat endpoint (BLD-400) is not published yet: this is the shape the widget expects. When the
 * backend answers differently, only this file changes.
 *
 *   POST /assistant/chat/   { message, session_id? }
 *   → { result: { session_id, reply, products?, suggestions?, source?: { title, url }, operator?,
 *                 not_found?, has_more? } }
 */
interface AssistantResponse {
  result: {
    session_id?: string;
    reply: string;
    products?: AssistantProduct[];
    suggestions?: string[];
    source?: { title: string; url: string } | null;
    operator?: boolean;
    not_found?: boolean;
    has_more?: boolean;
  };
}

/** The answer shows up to this many products. */
const MAX_PRODUCTS = 5;

const toSource = (source: AssistantResponse['result']['source']): AssistantSource | undefined =>
  source ? { title: source.title, href: source.url } : undefined;

export const sendAssistantMessage = async ({
  message,
  sessionId,
  signal
}: {
  message: string;
  sessionId?: string;
  signal?: AbortSignal;
}): Promise<AssistantReply> => {
  if (ASSISTANT_MOCK) return mockAssistantReply(message);

  if (typeof navigator !== 'undefined' && !navigator.onLine) throw new AssistantError('offline');

  try {
    const { data } = await publicApi.post<AssistantResponse>(
      '/assistant/chat/',
      { message, session_id: sessionId },
      { signal }
    );
    const result = data.result;
    const products = result.products ?? [];

    return {
      sessionId: result.session_id,
      text: result.reply,
      products: products.slice(0, MAX_PRODUCTS),
      suggestions: result.suggestions ?? [],
      source: toSource(result.source),
      handoff: !!result.operator,
      notFound: !!result.not_found,
      hasMore: !!result.has_more || products.length > MAX_PRODUCTS
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) throw new AssistantError('limit');
      // the assistant is switched off on the server
      if (error.response?.status === 503) throw new AssistantError('disabled');
      if (!error.response) throw new AssistantError('offline');
    }
    throw new AssistantError('generic');
  }
};
