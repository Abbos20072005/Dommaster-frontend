import { useTranslations } from 'next-intl';

import { formatPrice } from '@/lib/utils';

interface Props {
  order: Order;
}

const getProductsTotalPrice = (order: Order): number =>
  order.order_items.reduce(
    (sum, { product, quantity }) => sum + (product.discount_price ?? product.price) * quantity,
    0
  );

export const OrderPriceBreakdown = ({ order }: Props) => {
  const t = useTranslations();
  const productsTotal = getProductsTotalPrice(order);
  const hasPromo = !!order.promocode;
  const savedPrice =
    hasPromo && productsTotal > order.total_price ? productsTotal - order.total_price : 0;

  return (
    <div className='space-y-2'>
      <div className='flex justify-between gap-1 text-sm'>
        <p>
          {t('Goods')} ({order.order_items.length}):
        </p>
        <span>
          {formatPrice(productsTotal)} {t('sum')}
        </span>
      </div>
      <div className='flex justify-between gap-1 text-sm'>
        <span className='font-bold uppercase'>{order.promocode}</span>
        {savedPrice > 0 && (
          <p className='text-secondary'>
            -{formatPrice(savedPrice)} {t('sum')}
          </p>
        )}
      </div>
      <div className='flex justify-between gap-1 text-xl font-bold'>
        <p>{t('Total')}</p>
        <p>
          {formatPrice(order.total_price)} {t('sum')}
        </p>
      </div>
    </div>
  );
};
