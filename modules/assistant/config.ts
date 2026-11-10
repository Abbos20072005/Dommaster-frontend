/** The made-up assistant for looking at the window while the chat endpoint is not ready. */
export const ASSISTANT_MOCK = process.env.NEXT_PUBLIC_ASSISTANT_MOCK === '1';

/** The button is on every page; `NEXT_PUBLIC_ASSISTANT_DISABLED=1` takes it off the site. */
export const ASSISTANT_ENABLED = process.env.NEXT_PUBLIC_ASSISTANT_DISABLED !== '1';
