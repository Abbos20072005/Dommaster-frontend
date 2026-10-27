export const orderStatusMap: Record<OrderStatus, string> = {
  0: 'Pending',
  1: 'Collecting',
  2: 'Delivering',
  3: 'Delivered',
  4: 'Canceled',
  5: 'Ready for pickup'
};

export const orderStatusColorMap: Record<OrderStatus, string> = {
  0: 'bg-gray-100 text-gray-600',
  1: 'bg-yellow-100 text-yellow-600',
  2: 'bg-blue-100 text-blue-600',
  3: 'bg-green-100 text-green-600',
  4: 'bg-red-100 text-red-600',
  5: 'bg-green-100 text-green-600'
};

/** The steps of an order on its way: a pickup goes through Ready for pickup, not Delivering. */
export const getOrderSteps = (deliveryType?: number): OrderStatus[] =>
  deliveryType === 1 ? [0, 1, 5, 3] : [0, 1, 2, 3];

/** The name of a step; the last step of a pickup is Picked up, not Delivered. */
export const getStepLabel = (status: OrderStatus, deliveryType?: number) =>
  status === 3 && deliveryType === 1 ? 'Picked up' : orderStatusMap[status];

export const getPaymentLabel = (t: (key: string) => string, paymentType?: number, paymentMethod?: string) => {
  if (paymentType === 4) {
    if (paymentMethod === 'cash') return `${t('Cash on delivery')}, ${t('Cash')}`;
    if (paymentMethod === 'card') return `${t('Cash on delivery')}, ${t('Card')}`;
    return t('Cash on delivery');
  }
  return t('Pay online by card');
};
