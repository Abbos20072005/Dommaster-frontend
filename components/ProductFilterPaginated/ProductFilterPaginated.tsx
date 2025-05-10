'use client';

import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import React from 'react';

import { Filter, useFilter } from '@/components/modules/filter';
import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { Pagination } from '@/components/ui/pagination';
import { getProducts } from '@/utils/api/requests';

import { MobileFilterDrawer, ProductsSortBySelect } from './components';

interface Props {
  filters: Filter[];
  hideCategories?: boolean;
  queries?: Partial<ProductRequest>;
}

export const ProductFilterPaginated = ({ filters, hideCategories, queries }: Props) => {
  const { filter } = useFilter();
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
        <Filter filters={filters} hideCategories={hideCategories} />
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
          <div className='flex h-[50vh] items-center justify-center'>
            <h1 className='text-lg font-semibold'>No products found</h1>
          </div>
        )}
        <Pagination totalCount={getProductsQuery.data?.data.result.totalElements} />
      </div>
    </div>
  );
};
