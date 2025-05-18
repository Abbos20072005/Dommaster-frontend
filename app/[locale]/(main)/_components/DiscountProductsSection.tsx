'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import type { Locale } from '@/i18n/routing';

import { BaseLayout } from '@/components/layout';
import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { getSaleMain } from '@/utils/api/requests';

export const DiscountProductsSection = () => {
  const t = useTranslations();
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
          <div className='bg-muted px-2 pt-2'>
            <div className='px-4'>
              <Skeleton className='mb-1 h-5 w-32' />
              <Skeleton className='h-8 w-1/2' />
            </div>
            <ProductListSkeleton hideCart hideControl />
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
        <div className='relative px-2 pt-4'>
          <Image
            alt={sales.name}
            className='absolute inset-0 -z-1 size-full rounded-2xl object-cover'
            height={600}
            src={sales.bg_image}
            width={1200}
          />
          <div className='flex items-center justify-between gap-4 px-4'>
            <div>
              <p className='text-primary-foreground mb-1 text-sm'>
                {format(sales.discount_from, 'dd MMMM', { locale: localeMap[locale as Locale] })} –{' '}
                {format(sales.discount_to, 'dd MMMM', { locale: localeMap[locale as Locale] })}
              </p>
              <h2 className='text-primary-foreground text-lg font-bold md:text-2xl'>
                {sales.name}
              </h2>
            </div>
            <Button className='hidden md:block' variant='outline'>
              <Link href={`/sale/${sales.id}`}>{t('View all')}</Link>
            </Button>
          </div>
          <ProductList hideCart className='py-2' hideControl products={sales.products} />
          <Button className='mb-4 w-full md:hidden' size='sm' variant='outline'>
            <Link href={`/sale/${sales.id}`}>{t('View all')}</Link>
          </Button>
        </div>
      </BaseLayout>
    </section>
  );
};
