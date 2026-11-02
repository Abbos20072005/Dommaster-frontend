export const orderStatusMap: Record<OrderStatus, string> = {
  0: 'Pending',
  1: 'Confirmed',
  2: 'Collecting',
  3: 'Delivering',
  4: 'Ready for pickup',
  5: 'Delivered',
  6: 'Canceled'
};

export const orderStatusColorMap: Record<OrderStatus, string> = {
  0: 'bg-gray-100 text-gray-600',
  1: 'bg-sky-100 text-sky-600',
  2: 'bg-yellow-100 text-yellow-600',
  3: 'bg-blue-100 text-blue-600',
  4: 'bg-green-100 text-green-600',
  5: 'bg-green-100 text-green-600',
  6: 'bg-red-100 text-red-600'
};

/**
 * The steps of an order on its way: a delivery goes 0 -> 1 -> 2 -> 3 -> 5, a pickup goes through
 * Ready for pickup (4), not Delivering. Confirmed (1) may be skipped by the order itself.
 */
export const getOrderSteps = (deliveryType?: number): OrderStatus[] =>
  deliveryType === 1 ? [0, 1, 2, 4, 5] : [0, 1, 2, 3, 5];

/** The name of a step; the last step of a pickup is Picked up, not Delivered. */
export const getStepLabel = (status: OrderStatus, deliveryType?: number) =>
  status === 5 && deliveryType === 1 ? 'Picked up' : orderStatusMap[status];

/** An order that can still be canceled by the customer: not yet on its way (0 Pending, 1 Confirmed, 2 Collecting). */
export const canCancelOrder = (status: OrderStatus) => status <= 2;

export const getPaymentLabel = (t: (key: string) => string, paymentType?: number, paymentMethod?: string) => {
  if (paymentType === 4) {
    if (paymentMethod === 'cash') return `${t('Cash on delivery')}, ${t('Cash')}`;
    if (paymentMethod === 'card') return `${t('Cash on delivery')}, ${t('Card')}`;
    return t('Cash on delivery');
  }
  return t('Pay online by card');
};
