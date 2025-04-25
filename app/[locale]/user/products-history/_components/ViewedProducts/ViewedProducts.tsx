'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { useViewedProducts } from './hooks';

export const ViewedProducts = () => {
  const t = useTranslations();
  const { state, functions } = useViewedProducts();

  if (state.isLoading) {
    return <ProductListSkeleton view='grid' />;
  }

  if (!state.products?.length) return null;

  return (
    <div className='space-y-4'>
      <ProductList view='grid' products={state.products} />

      {state.hasNextPage && (
        <Button
          className='w-full'
          disabled={state.isFetchingNextPage}
          size='sm'
          variant='outline'
          onClick={functions.onLoadMore}
        >
          <Spinner show={state.isFetchingNextPage} />
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
