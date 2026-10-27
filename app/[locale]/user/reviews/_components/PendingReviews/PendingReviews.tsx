'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { ProductCommentDialog } from '@/modules/product';
import { getOrderById, getOrdersHistory } from '@/utils/api/requests';
import { productHref } from '@/lib/urls';

const ORDERS_TO_CHECK = 5;

/**
 * Products of the delivered orders the customer has not reviewed yet. The API has no such list,
 * so it is made of the last delivered orders (status 3): their products without a review.
 */
export const usePendingReviews = () =>
  useQuery({
    queryKey: ['pendingReviews'],
    staleTime: 60_000,
    queryFn: async () => {
      const history = await getOrdersHistory({
        config: { params: { page: 1, page_size: ORDERS_TO_CHECK } }
      });
      const delivered = history.data.result.content.filter((order) => order.status === 3);
      const orders = await Promise.all(delivered.map((order) => getOrderById({ id: order.id })));

      const byId = new Map<number, Product>();
      for (const order of orders) {
        for (const { product } of order.data.result.order_items) {
          if (product && !product.is_commented && !byId.has(product.id)) {
            byId.set(product.id, product);
          }
        }
      }
      return [...byId.values()];
    }
  });

export const PendingReviews = ({ query }: { query: UseQueryResult<Product[]> }) => {
  const t = useTranslations();

  if (query.isLoading) {
    return (
      <div className='grid gap-3' aria-busy='true'>
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className='h-20 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!query.data?.length) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='bg-primary/10 text-primary mb-2 flex size-14 items-center justify-center rounded-full'>
          <StarIcon className='size-6' />
        </span>
        <h2 className='text-xl leading-[26px] font-bold'>{t('All purchases rated')}</h2>
        <p className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>
          {t('All purchases rated text')}
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-3'>
      <span className='text-[15px] leading-[22px] text-[#4A5563]'>
        {t('Products of delivered orders')}
      </span>
      <div className='border-border grid gap-px overflow-hidden rounded-xl border bg-[#E1E5EB]'>
        {query.data.map((product) => (
          <div key={product.id} className='flex items-center gap-3.5 bg-white px-5 py-3.5'>
            <Link
              className='bg-muted relative size-14 shrink-0 overflow-hidden rounded-lg'
              href={productHref(product)}
            >
              {product.images?.[0]?.image && (
                <Image
                  fill
                  alt={product.name || 'Buildex'}
                  className='object-contain p-1'
                  sizes='56px'
                  src={product.images[0].image}
                />
              )}
            </Link>
            <div className='grid min-w-0 flex-1 gap-0.5'>
              <Link
                className='hover:text-primary line-clamp-2 text-sm leading-5 font-bold transition-colors'
                href={productHref(product)}
              >
                {product.name}
              </Link>
              <span className='text-muted-foreground text-[13px] tabular-nums'>
                {formatPrice(product.discount_price ?? product.price)} {t('sum')}
              </span>
            </div>
            <ProductCommentDialog asChild productId={product.id}>
              <button
                className='bg-primary hover:bg-primary/90 inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-bold text-white'
                type='button'
              >
                <StarIcon className='size-4' />
                {t('Rate')}
              </button>
            </ProductCommentDialog>
          </div>
        ))}
      </div>
    </div>
  );
};
