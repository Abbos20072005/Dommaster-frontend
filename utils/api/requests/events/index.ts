import { api } from '@/utils/api/instance';

type FunnelEvent = { type: 'product_view'; product_id: number } | { type: 'checkout_start' };

/**
 * POST /events/ — the product funnel (view, checkout start) counted by the backend. Call it from
 * the browser only, after the page is shown (never in SSR, `generateMetadata` or a prefetch: a bot
 * or a prefetch would be counted too). Fire and forget: no wait, no error for the visitor.
 * Only the production site sends it, so a local run does not fill the real statistics.
 */
export const sendFunnelEvent = (event: FunnelEvent) => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;
  api.post('/events/', { ...event, platform: 'site' }).catch(() => {});
};
