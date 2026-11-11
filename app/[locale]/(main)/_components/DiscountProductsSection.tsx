'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import Image from 'next/image';

import type { Locale } from '@/i18n/routing';

import { BaseLayout } from '@/components/layout';
import { ProductSection } from '@/modules/product';
import { getSaleMain } from '@/utils/api/requests';

import { DiscountProductsSkeleton } from './DiscountProductsSkeleton';

interface Props {
  /** the answer of the server (see `DiscountProducts`): the block is drawn with it at once */
  initial?: SaleMainResponse | null;
}

export const DiscountProductsSection = ({ initial }: Props) => {
  const getSaleMainQuery = useQuery({
    queryKey: ['saleMain'],
    staleTime: 0,
    queryFn: () => getSaleMain().then((response) => response.data),
    initialData: initial ?? undefined
  });
  const sales = getSaleMainQuery.data?.result;

  const locale = useLocale();

  if (getSaleMainQuery.isLoading) return <DiscountProductsSkeleton />;

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
            alt={sales.name || 'Buildex'}
            className='absolute inset-0 -z-1 size-full rounded-2xl object-cover'
            height={600}
            // the biggest picture of the block: it is drawn with the page, not after it
            loading='eager'
            // the picture lies under the whole block: without `sizes` a phone took the 3840px one
            sizes='(min-width: 1368px) 1368px, 100vw'
            src={sales.bg_image}
            width={1200}
          />
          <ProductSection
            onDark
            headerClassName='px-4'
            href={`/sale/${sales.id}`}
            listClassName='px-4 pb-4'
            products={sales.products}
            title={
              <div>
                <p className='text-primary-foreground mb-1 text-sm'>
                  {format(sales.discount_from, 'dd MMMM', {
                    locale: localeMap[locale as Locale]
                  })}{' '}
                  –{' '}
                  {format(sales.discount_to, 'dd MMMM', { locale: localeMap[locale as Locale] })}
                </p>
                <h2 className='text-primary-foreground text-lg font-bold md:text-2xl'>
                  {sales.name}
                </h2>
              </div>
            }
          />
        </div>
      </BaseLayout>
    </section>
  );
};
