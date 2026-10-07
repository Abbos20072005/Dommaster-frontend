'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useQueryState } from 'nuqs';
import React from 'react';

import type { FilterDefaultValues } from '@/modules/filter/useFilter';

import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Filter, useAttributeFilters, useFilter } from '@/modules/filter';
import { ProductList, ProductListSkeleton } from '@/modules/product';
import { searchProducts } from '@/modules/search';
import { getItemCategoryFilters } from '@/utils/api/requests';

import { MobileFilterDrawer, ProductsSortBySelect, SearchNotFound } from './components';
import { resolveSortBy } from './constants';

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
  const { filter, isCleared, onReset } = useFilter();
  const { filters: attributeValues } = useAttributeFilters();
  const [q] = useQueryState('q');
  const [chosenSortBy] = useQueryState('sort_by');
  const sort_by = resolveSortBy(chosenSortBy, q);

  const getProductsQuery = useQuery({
    queryKey: [
      'products',
      {
        q,
        sort_by,
        ...filter,
        ...queries,
        filters: attributeValues
      }
    ],
    staleTime: 0,
    queryFn: () =>
      // the text query goes through the smart search (Latin letters, synonyms)
      searchProducts({
        q: q ?? undefined,
        sort_by,
        item_category: filter.item_category ?? undefined,
        brand: filter.brand ?? undefined,
        sale_id: filter.sale_id ?? undefined,
        page: filter.page,
        page_size: filter.page_size,
        price_from: filter.price_from,
        price_to: filter.price_to,
        filters: attributeValues,
        ...queries
      })
  });

  // Kategoriya bo'yicha sozlangan atribut filtrlari (o'lcham, material, qadoq...)
  const itemCategoryId = queries?.item_category;
  const getAttributeFiltersQuery = useQuery({
    queryKey: ['itemCategoryFilters', itemCategoryId],
    enabled: !!itemCategoryId,
    staleTime: 5 * 60 * 1000,
    queryFn: () => getItemCategoryFilters({ id: itemCategoryId! })
  });
  const attributeFilters = getAttributeFiltersQuery.data?.data.result;

  const products = getProductsQuery.data?.data.result.content || [];

  return (
    <div className='gap-8 lg:flex'>
      <aside className='hidden w-60 lg:block lg:w-64'>
        <Filter
          attributeFilters={attributeFilters}
          defaultValues={filterDefaultValues}
          filters={filters}
          hideCategories={hideCategories}
        />
      </aside>
      <div className='space-y-4 lg:flex-1'>
        <div className='flex items-center justify-between'>
          <ProductsSortBySelect />
          <MobileFilterDrawer
            attributeFilters={attributeFilters}
            filters={filters}
            hideCategories={hideCategories}
          />
        </div>
        {getProductsQuery.isFetching ? (
          <ProductListSkeleton view='grid' />
        ) : products.length ? (
          <ProductList view='grid' products={products} />
        ) : q ? (
          <SearchNotFound filtersApplied={!isCleared} query={q} onResetFilters={onReset} />
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
              <Button className='mt-4' variant='muted' onClick={onReset}>
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
