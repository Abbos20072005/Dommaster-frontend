'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { HistoryIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { OrderList } from '@/app/[locale]/user/orders/_components';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getOrdersHistory } from '@/utils/api/requests';

export const OrdersHistory = () => {
  const t = useTranslations();
  const getOrdersHistoryQuery = useInfiniteQuery({
    queryKey: ['orders', 'history'],
    queryFn: ({ pageParam }) =>
      getOrdersHistory({
        config: { params: { page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const orders = getOrdersHistoryQuery.data?.pages.flatMap((page) => page.data.result.content);

  if (getOrdersHistoryQuery.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (orders?.length === 0 || !orders) {
    // the history holds only completed orders — active ones are in "My orders"
    return (
      <EmptyState
        action={{ href: '/user/orders/active', label: t('My orders') }}
        description={t('Active orders are in the My orders section')}
        icon={<HistoryIcon />}
        title={t('No completed orders yet')}
      />
    );
  }

  return (
    <>
      <OrderList orders={orders} />
      {getOrdersHistoryQuery.hasNextPage && (
        <Button
          className='mt-4 w-full'
          size='sm'
          variant='outline'
          isLoading={getOrdersHistoryQuery.isFetchingNextPage}
          onClick={() => getOrdersHistoryQuery.fetchNextPage()}
        >
          {t('Load more')}
        </Button>
      )}
    </>
  );
};
