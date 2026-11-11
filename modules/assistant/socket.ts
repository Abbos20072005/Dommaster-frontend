import { getClientLocale } from '@/utils/api/getClientLocale';
import { getClientToken } from '@/utils/api/getClientToken';
import { getDeviceId } from '@/utils/api/getDeviceId';

import type { ChatResult } from './api';
import type { AssistantReply } from './types';

import { kindOfCode, toReply } from './api';
import { AssistantError } from './types';

/** The socket could not be used (not open, closed before the answer began): ask by HTTP instead. */
export class SocketUnavailable extends Error {}

type ServerEvent =
  | { type: 'start'; conversation_id: number; message_id: number; question: ChatResult['question'] }
  | { type: 'tool'; name: string }
  | { type: 'delta'; text: string }
  | ({ type: 'done' } & ChatResult)
  | { type: 'error'; error_code: number; detail?: string };

export interface SocketCallbacks {
  /** the question is accepted: the id of the chat and the question as saved (a card is hidden) */
  onStart: (info: { conversationId: number; questionText: string; piiMasked: boolean }) => void;
  /** the assistant is searching the catalog */
  onTool: () => void;
  /** the next piece of the text */
  onDelta: (text: string) => void;
}

/** `https://api.host/api/v1/` → `wss://api.host/ws/assistant/` */
const socketUrl = () => {
  const base = new URL(process.env.API_URL ?? window.location.origin);
  // the assistant speaks uz and ru
  const lang = getClientLocale() === 'uz' ? 'uz' : 'ru';
  const params = new URLSearchParams({ device_id: getDeviceId(), lang });
  const token = getClientToken();
  if (token) params.set('token', token);

  return `${base.protocol === 'https:' ? 'wss:' : 'ws:'}//${base.host}/ws/assistant/?${params}`;
};

/** Longer than this to open the socket, and the question goes by HTTP. */
const OPEN_TIMEOUT = 4000;

let socket: WebSocket | null = null;

const open = () =>
  new Promise<WebSocket>((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      resolve(socket);
      return;
    }

    let ws: WebSocket;
    try {
      ws = new WebSocket(socketUrl());
    } catch {
      reject(new SocketUnavailable());
      return;
    }

    const timer = setTimeout(() => {
      ws.close();
      reject(new SocketUnavailable());
    }, OPEN_TIMEOUT);

    ws.onopen = () => {
      clearTimeout(timer);
      socket = ws;
      resolve(ws);
    };
    // 4001: the token is old; the HTTP way refreshes it, and the next socket takes the new one
    ws.onerror = ws.onclose = () => {
      clearTimeout(timer);
      if (socket === ws) socket = null;
      reject(new SocketUnavailable());
    };
  });

/** Drops the socket (a new chat, or the window is closed while an answer is on its way). */
export const closeAssistantSocket = () => {
  socket?.close();
  socket = null;
};

/**
 * One question through the WebSocket: `start`, `tool` and `delta` go to the callbacks, `done` gives
 * the final answer. One socket carries one question at a time. Rejects with `SocketUnavailable`
 * while nothing was received (the caller asks by HTTP), with `AssistantError` otherwise.
 */
export const askViaSocket = async (
  payload: { message: string; conversationId?: number },
  callbacks: SocketCallbacks,
  signal?: AbortSignal
): Promise<AssistantReply> => {
  const ws = await open();

  return new Promise<AssistantReply>((resolve, reject) => {
    let started = false;

    const finish = (action: () => void) => {
      ws.removeEventListener('message', onMessage);
      ws.removeEventListener('close', onClose);
      signal?.removeEventListener('abort', onAbort);
      action();
    };

    const onMessage = (event: MessageEvent<string>) => {
      let data: ServerEvent;
      try {
        data = JSON.parse(event.data) as ServerEvent;
      } catch {
        return;
      }

      if (data.type === 'start') {
        started = true;
        callbacks.onStart({
          conversationId: data.conversation_id,
          questionText: data.question?.text,
          piiMasked: !!data.question?.pii_masked
        });
      } else if (data.type === 'tool') {
        callbacks.onTool();
      } else if (data.type === 'delta') {
        callbacks.onDelta(data.text);
      } else if (data.type === 'done') {
        finish(() => resolve(toReply(data)));
      } else if (data.type === 'error') {
        finish(() => reject(new AssistantError(kindOfCode(data.error_code))));
      }
    };

    const onClose = () => {
      socket = null;
      finish(() => reject(started ? new AssistantError('generic') : new SocketUnavailable()));
    };

    // a question that is given up (a new chat): the socket is dropped, or its answer would run into
    // the next question ("one question at a time")
    const onAbort = () => {
      finish(() => {
        closeAssistantSocket();
        reject(new DOMException('aborted', 'AbortError'));
      });
    };

    ws.addEventListener('message', onMessage);
    ws.addEventListener('close', onClose);
    signal?.addEventListener('abort', onAbort);

    ws.send(
      JSON.stringify({
        type: 'message',
        message: payload.message,
        conversation_id: payload.conversationId,
        platform: 'site'
      })
    );
  });
};
