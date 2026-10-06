'use client';

import { EyeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { ProductList, ProductListSkeleton } from '@/modules/product';

import { useViewedProducts } from './hooks';

export const ViewedProducts = () => {
  const t = useTranslations();
  const { state, functions } = useViewedProducts();

  if (state.isLoading) {
    return <ProductListSkeleton view='grid' />;
  }

  if (!state.products?.length)
    return (
      <EmptyState
        action={{ href: '/catalog', label: t('Go to catalog') }}
        description={t('Products you open will appear here')}
        icon={<EyeIcon />}
        title={t('No viewed products yet')}
      />
    );

  return (
    <div className='space-y-4'>
      <ProductList view='grid' products={state.products} />

      {state.hasNextPage && (
        <Button
          className='w-full'
          size='sm'
          variant='outline'
          isLoading={state.isFetchingNextPage}
          onClick={functions.onLoadMore}
        >
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
