'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PackageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { OrderList } from '@/app/[locale]/user/orders/_components';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getOrdersActive } from '@/utils/api/requests';

export const OrdersActive = () => {
  const t = useTranslations();
  const getOrdersActiveQuery = useInfiniteQuery({
    queryKey: ['orders', 'active'],
    queryFn: ({ pageParam }) =>
      getOrdersActive({
        config: { params: { page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const orders = getOrdersActiveQuery.data?.pages.flatMap((page) => page.data.result.content);

  if (getOrdersActiveQuery.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (orders?.length === 0 || !orders) {
    return (
      <EmptyState
        action={{ href: '/catalog', label: t('Go to catalog') }}
        description={t('Choose products in the catalog and place an order')}
        icon={<PackageIcon />}
        title={t('No active orders')}
      />
    );
  }

  return (
    <>
      <OrderList orders={orders} />
      {getOrdersActiveQuery.hasNextPage && (
        <Button
          className='mt-4 w-full'
          size='sm'
          variant='outline'
          isLoading={getOrdersActiveQuery.isFetchingNextPage}
          onClick={() => getOrdersActiveQuery.fetchNextPage()}
        >
          {t('Load more')}
        </Button>
      )}
    </>
  );
};
