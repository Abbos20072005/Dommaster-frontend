/** The made-up assistant for looking at the window while the chat endpoint is not ready. */
export const ASSISTANT_MOCK = process.env.NEXT_PUBLIC_ASSISTANT_MOCK === '1';

/** The widget is shown only when the endpoint is ready (or the made-up assistant is on). */
export const ASSISTANT_ENABLED = process.env.NEXT_PUBLIC_ASSISTANT_ENABLED === '1' || ASSISTANT_MOCK;
