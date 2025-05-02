'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import Image from 'next/image';

import type { Locale } from '@/i18n/routing';

import { BaseLayout } from '@/components/layout';
import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { Skeleton } from '@/components/ui/skeleton';
import { getSaleMain } from '@/utils/api/requests';

export const DiscountProductsSection = () => {
  const getSaleMainQuery = useQuery({
    queryKey: ['saleMain'],
    staleTime: 0,
    queryFn: () => getSaleMain()
  });
  const sales = getSaleMainQuery?.data?.data.result;

  const locale = useLocale();

  if (getSaleMainQuery.isLoading)
    return (
      <section>
        <BaseLayout>
          <div className='bg-muted px-4 pt-4'>
            <Skeleton className='mb-2 h-5 w-32' />
            <Skeleton className='h-8 w-1/2' />
            <ProductListSkeleton />
          </div>
        </BaseLayout>
      </section>
    );

  if (!sales?.products.length) return null;

  const localeMap = {
    en: undefined,
    uz,
    ru
  };

  return (
    <section>
      <BaseLayout className='px-0'>
        <div className='relative px-4 pt-4'>
          <Image
            alt={sales.name}
            className='absolute inset-0 -z-1 size-full rounded-2xl object-cover'
            height={600}
            src={sales.bg_image}
            width={1200}
          />
          <p className='text-primary-foreground mb-2 text-sm'>
            {format(sales.discount_from, 'dd MMMM', { locale: localeMap[locale as Locale] })} –{' '}
            {format(sales.discount_to, 'dd MMMM', { locale: localeMap[locale as Locale] })}
          </p>
          <h2 className='text-primary-foreground text-lg font-bold md:text-2xl'>{sales.name}</h2>
          <ProductList products={sales.products} />
        </div>
      </BaseLayout>
    </section>
  );
};
