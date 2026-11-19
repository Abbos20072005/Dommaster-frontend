'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { useLocale } from 'next-intl';

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
        {/* the block is a plain light blue (#D4E6F6, Pantone 290C), no background picture */}
        <div className='rounded-2xl bg-[#D4E6F6] px-3 pt-3'>
          <ProductSection
            hideCart
            onDark
            headerClassName='px-1'
            href={`/sale/${sales.id}`}
            // the cards are 12px from the sides and 1px from the bottom of the block (the carousel
            // has 16px of its own below)
            listClassName='-mb-[15px]'
            products={sales.products}
            title={
              <div className='flex flex-wrap items-baseline gap-x-3 gap-y-0.5'>
                <p className='text-muted-foreground order-last text-sm'>
                  {format(sales.discount_from, 'dd MMMM', {
                    locale: localeMap[locale as Locale]
                  })}{' '}
                  – {format(sales.discount_to, 'dd MMMM', { locale: localeMap[locale as Locale] })}
                </p>
                <h2 className='text-lg font-bold md:text-2xl'>
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
