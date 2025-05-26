import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';

interface Props {
  order: Order;
}

export const OrderProducts = ({ order }: Props) => {
  const t = useTranslations();

  return (
    <div className='space-y-4 divide-y'>
      {order.order_items.map(({ product, quantity }) => (
        <div key={product.id} className='flex flex-1 flex-col gap-4 py-4 sm:flex-row'>
          <div className='flex flex-1 gap-1 sm:gap-3'>
            <Link href={`/product/${product.id}`}>
              <Image
                alt={product.name}
                className='size-[80px] object-contain sm:size-[100px]'
                height={100}
                src={product.images[0]?.image ?? '/product/no-image.png'}
                width={100}
              />
            </Link>
            <div className='flex flex-1 flex-col justify-between gap-3'>
              <div>
                <p className='text-muted-foreground mb-3 text-xs'>
                  {t('code')}: {product.id}
                </p>
                <Link href={`/product/${product.id}`} className='line-clamp-3 text-sm'>
                  {product.name}
                </Link>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <span className='text-muted-foreground text-sm'>
                {quantity} {t('unit')}.
              </span>
              {product.discount_price && (
                <div className='mb-2 flex items-center gap-2'>
                  <span className='text-xs line-through'>
                    {formatPrice(product.price * quantity)} {t('sum')}
                  </span>
                  <Badge variant='secondary'>-{product.discount}%</Badge>
                </div>
              )}
              <div className='text-sm font-bold sm:text-lg'>
                {formatPrice((product.discount_price ?? product.price) * quantity)} {t('sum')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
