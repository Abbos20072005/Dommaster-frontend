/**
 * Analytics events for Google Tag Manager (GA4 and Yandex Metrika are connected inside GTM).
 * The names are the GA4 e-commerce ones; the mobile apps use the same names (BLD-134).
 */

import { getClientLocale } from '@/utils/api/getClientLocale';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const CURRENCY = 'UZS';

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
}

/** The product as an e-commerce item: `item_id` is the product code (the id when there is none). */
export const toAnalyticsItem = (product: Product, quantity = 1): AnalyticsItem => ({
  item_id: String(product.id),
  item_name: product.name,
  price: product.discount_price ?? product.price,
  quantity,
  item_brand: product.brand?.name,
  item_category: product.breadcrumbs?.[0]?.name
});

export const trackEvent = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // the previous e-commerce object must not leak into this event
  if ('ecommerce' in params) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ...params });
};

export const trackViewItem = (product: Product) =>
  trackEvent('view_item', {
    ecommerce: {
      currency: CURRENCY,
      value: product.discount_price ?? product.price,
      items: [toAnalyticsItem(product)]
    }
  });

export const trackViewItemList = (listName: string, products: Product[]) =>
  trackEvent('view_item_list', {
    ecommerce: {
      item_list_name: listName,
      items: products.map((product, index) => ({ ...toAnalyticsItem(product), index }))
    }
  });

/** The Russian config of a request: the names of the goods in the events are Russian on /uz too (BLD-566). */
const RUSSIAN = { headers: { 'Accept-Language': 'ru' } };

/** the Russian names already asked for, by product id (the same product is not asked twice) */
const russianNames = new Map<string, string>();

/**
 * PM Expert compares the goods of a purchase with its catalog by the Russian NAME (it does not read
 * `item_id`). On the Russian site the names are Russian already; on /uz they are asked in Russian
 * (`load` gets the ids not known yet). When the request fails the Uzbek name goes: the event
 * must not be lost.
 */
const withRussianNames = async (
  items: AnalyticsItem[],
  load: (missingIds: number[]) => Promise<{ id: number; name: string }[]>
): Promise<AnalyticsItem[]> => {
  if (getClientLocale() === 'ru') return items;
  try {
    const missing = items.filter((item) => !russianNames.has(item.item_id)).map((item) => +item.item_id);
    if (missing.length) {
      for (const product of await load(missing)) {
        if (product?.name) russianNames.set(String(product.id), product.name);
      }
    }
  } catch {
    // the names stay as they are
  }
  return items.map((item) => ({ ...item, item_name: russianNames.get(item.item_id) ?? item.item_name }));
};

const sumOf = (items: AnalyticsItem[]) =>
  items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);

/** `add_to_cart`: once per adding, with the quantity added; several products in one event. */
export const trackAddedToCart = async (entries: { product: Product; quantity?: number }[]) => {
  const added = entries.filter((entry) => (entry.quantity ?? 1) > 0);
  if (!added.length) return;
  const items = await withRussianNames(
    added.map(({ product, quantity }) => toAnalyticsItem(product, quantity ?? 1)),
    async (ids) => {
      const { getProductById } = await import('@/utils/api/requests');
      const answers = await Promise.all(ids.map((id) => getProductById({ id, config: RUSSIAN })));
      return answers.map((answer) => answer.data.result);
    }
  );
  trackEvent('add_to_cart', { ecommerce: { currency: CURRENCY, value: sumOf(items), items } });
};

export const trackAddToCart = (product: Product, quantity = 1) =>
  trackAddedToCart([{ product, quantity }]);

/** `begin_checkout`: the items of the checkout; `value` is their sum (GA4: without delivery). */
export const trackBeginCheckout = async (cartItems: CartItem[]) => {
  const items = await withRussianNames(
    cartItems.map((item) => toAnalyticsItem(item.product, item.quantity)),
    async () => {
      const { getCartList } = await import('@/utils/api/requests');
      const answer = await getCartList({ config: RUSSIAN });
      return answer.data.result.cart_items.map((item) => item.product);
    }
  );
  trackEvent('begin_checkout', { ecommerce: { currency: CURRENCY, value: sumOf(items), items } });
};

/**
 * The buyer's phone goes into `purchase` only (BLD-571: PM Expert joins a purchase with a call-back
 * request by the phone). It is off until `NEXT_PUBLIC_PURCHASE_PHONE=1` is set: that is the switch
 * to turn the sending on and off without a code change (the legal decision, BLD-568).
 */
const SEND_PURCHASE_PHONE = process.env.NEXT_PUBLIC_PURCHASE_PHONE === '1';

/** `+998901234567` (E.164, no spaces) from any way a Uzbek number is written; `null` when it is not one. */
export const toE164 = (phone?: string | null) => {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length === 9) return `+998${digits}`;
  return /^998\d{9}$/.test(digits) ? `+${digits}` : null;
};

/** `purchase` of an order whose items already have their (Russian) names. */
const trackPurchase = (order: Order) => {
  const phone = SEND_PURCHASE_PHONE ? toE164(order.customer?.phone_number) : null;
  trackEvent('purchase', {
    ecommerce: {
      transaction_id: String(order.id),
      currency: CURRENCY,
      value: order.total_price,
      shipping: Number(order.delivery_price ?? 0),
      coupon: order.promocode?.code,
      items: order.order_items.map((item) => toAnalyticsItem(item.product, item.quantity))
    },
    ...(phone ? { user_data: { phone_number: phone } } : {})
  });
  // GTM keeps what a push sets for the pushes after it: the phone must not stay for the next events
  if (phone) window.dataLayer?.push({ user_data: null });
};

/**
 * `purchase`: once per order, when the order is placed and paid (the Atmos hold went through) or
 * needs no payment. The order is read again in Russian (the items and the total are the ones of
 * the order); it is remembered in this browser, so a second call for the same order (a reload,
 * a second try to pay) sends nothing.
 */
export const trackPurchaseOnce = async (orderId: number | string) => {
  const key = `purchase_tracked_${orderId}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
  } catch {
    // no storage: the event may repeat, which is better than losing the purchase
  }
  try {
    const { getOrderById } = await import('@/utils/api/requests');
    trackPurchase((await getOrderById({ id: orderId, config: RUSSIAN })).data.result);
  } catch {
    // not read: it is tried again at the next call
    try {
      localStorage.removeItem(key);
    } catch {
      // nothing to do
    }
  }
};
