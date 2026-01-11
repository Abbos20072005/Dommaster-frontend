'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useQueryState } from 'nuqs';
import React from 'react';

import type { FilterDefaultValues } from '@/modules/filter/useFilter';

import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Filter, useFilter } from '@/modules/filter';
import { ProductList, ProductListSkeleton } from '@/modules/product';
import { getProducts } from '@/utils/api/requests';

import { MobileFilterDrawer, ProductsSortBySelect } from './components';

interface Props {
  filterDefaultValues?: FilterDefaultValues;
  filters: Filter[];
  hideCategories?: boolean;
  queries?: Partial<ProductRequest>;
}

export const ProductFilterPaginated = ({
  filterDefaultValues,
  filters,
  hideCategories,
  queries
}: Props) => {
  const t = useTranslations();
  const { filter, setFilter, isCleared } = useFilter();
  const [q] = useQueryState('q');
  const [sort_by] = useQueryState('sort_by');

  const getProductsQuery = useQuery({
    queryKey: [
      'products',
      {
        q,
        sort_by,
        ...filter,
        ...queries
      }
    ],
    staleTime: 0,
    queryFn: () =>
      getProducts({
        data: {
          q: q ?? undefined,
          sort_by: sort_by ?? undefined,
          item_category: filter.item_category ?? undefined,
          brand: filter.brand ?? undefined,
          sale_id: filter.sale_id ?? undefined,
          page: filter.page,
          page_size: filter.page_size,
          price_from: filter.price_from,
          price_to: filter.price_to,
          ...queries
        }
      })
  });

  const products = getProductsQuery.data?.data.result.content || [];

  return (
    <div className='gap-8 lg:flex'>
      <aside className='hidden w-60 lg:block lg:w-64'>
        <Filter
          defaultValues={filterDefaultValues}
          filters={filters}
          hideCategories={hideCategories}
        />
      </aside>
      <div className='space-y-4 lg:flex-1'>
        <div className='flex items-center justify-between'>
          <ProductsSortBySelect />
          <MobileFilterDrawer filters={filters} hideCategories={hideCategories} />
        </div>
        {getProductsQuery.isFetching ? (
          <ProductListSkeleton view='grid' />
        ) : products.length ? (
          <ProductList view='grid' products={products} />
        ) : (
          <div className='flex h-[50vh] flex-col items-center justify-center gap-3'>
            <Image alt='not-found' height={150} src='/product/not-found.png' width={150} />
            <div className='text-center text-base font-semibold md:text-xl'>
              {t('We couldn’t find any matching products')}
            </div>
            <div className='text-muted-foreground text-sm'>
              {t('Try changing or removing filters')}
            </div>
            {!isCleared && (
              <Button className='mt-4' variant='muted' onClick={() => setFilter(null)}>
                {t('Reset all filters')}
              </Button>
            )}
          </div>
        )}
        <Pagination totalCount={getProductsQuery.data?.data.result.totalElements} />
      </div>
    </div>
  );
};
