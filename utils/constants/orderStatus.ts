export const orderStatusMap: Record<OrderStatus, string> = {
  0: 'Pending',
  1: 'Collecting',
  2: 'Delivering',
  3: 'Delivered',
  4: 'Canceled'
};

export const orderStatusColorMap: Record<OrderStatus, string> = {
  0: 'bg-gray-100 text-gray-600',
  1: 'bg-yellow-100 text-yellow-600',
  2: 'bg-blue-100 text-blue-600',
  3: 'bg-green-100 text-green-600',
  4: 'bg-red-100 text-red-600'
};

export const getPaymentLabel = (t: (key: string) => string, paymentType?: number, paymentMethod?: string) => {
  if (paymentType === 4) {
    if (paymentMethod === 'cash') return `${t('Cash on delivery')}, ${t('Cash')}`;
    if (paymentMethod === 'card') return `${t('Cash on delivery')}, ${t('Card')}`;
    return t('Cash on delivery');
  }
  return t('Pay online by card');
};
