import { trackEvent } from '@/lib/analytics';

/** The tracker of PM Expert (`track.js`, loaded by GTM): it may be missing (CSP, an ad blocker). */
declare global {
  interface Window {
    pmTrack?: { callback?: (data: { name: string; phone: string; comment: string }) => void };
  }
}

export type CallbackLocation = 'header' | 'product' | 'cart';

const STORAGE_KEY = 'callback_requests';
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const sentInMemory: number[] = [];

/** the moments of the requests sent from this device in the last hour */
const recentRequests = () => {
  const now = Date.now();
  let stored: number[] = [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (Array.isArray(parsed)) stored = parsed.filter((time) => typeof time === 'number');
  } catch {
    // no storage: only the ones of this page view are counted
  }
  return [...new Set([...stored, ...sentInMemory])].filter((time) => now - time < WINDOW_MS);
};

/** BLD-572: not more than 3 requests an hour from one device (the cheapest protection from spam). */
export const callbackLimitReached = () => recentRequests().length >= LIMIT;

/**
 * A request is accepted: it goes to PM Expert (`pmTrack.callback`, which puts it into the Telegram chat
 * of the leads) and `generate_lead` goes to GA4. Both are fire-and-forget: a missing tracker must not
 * break the form or show an error.
 */
export const sendCallbackRequest = (
  data: { name: string; phone: string; comment: string },
  location: CallbackLocation
) => {
  sentInMemory.push(Date.now());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentRequests()));
  } catch {
    // kept in memory only
  }
  try {
    window.pmTrack?.callback?.(data);
  } catch {
    // the tracker failed: the customer still gets his confirmation
  }
  trackEvent('generate_lead', { lead_source: 'callback', form_location: location });
};
