'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PackageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BlockError } from '@/app/[locale]/user/_components/BlockError';
import { OrderList } from '@/app/[locale]/user/orders/_components';
import { OrdersEmpty } from '@/app/[locale]/user/orders/_components/OrdersEmpty';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
      <div className='grid gap-4' aria-busy='true'>
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className='h-52 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (getOrdersActiveQuery.isError) {
    return (
      <BlockError
        isRetrying={getOrdersActiveQuery.isRefetching}
        onRetry={() => getOrdersActiveQuery.refetch()}
      />
    );
  }

  if (orders?.length === 0 || !orders) {
    return (
      <OrdersEmpty
        action={{ href: '/catalog', label: t('Go to catalog') }}
        description={t('Active orders description')}
        icon={<PackageIcon />}
        secondary={{ href: '/user/orders/history', label: t('Open history') }}
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
