/**
 * Analytics events for Google Tag Manager (GA4 and Yandex Metrika are connected inside GTM).
 * The names are the GA4 e-commerce ones; the mobile apps use the same names (BLD-134).
 */

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

export const trackAddToCart = (product: Product, quantity = 1) =>
  trackEvent('add_to_cart', {
    ecommerce: {
      currency: CURRENCY,
      value: (product.discount_price ?? product.price) * quantity,
      items: [toAnalyticsItem(product, quantity)]
    }
  });

export const trackBeginCheckout = (items: CartItem[], value: number) =>
  trackEvent('begin_checkout', {
    ecommerce: {
      currency: CURRENCY,
      value,
      items: items.map((item) => toAnalyticsItem(item.product, item.quantity))
    }
  });

export const trackPurchase = (order: Order) =>
  trackEvent('purchase', {
    ecommerce: {
      transaction_id: String(order.id),
      currency: CURRENCY,
      value: order.total_price,
      shipping: Number(order.delivery_price ?? 0),
      coupon: order.promocode?.code,
      items: order.order_items.map((item) => toAnalyticsItem(item.product, item.quantity))
    }
  });
