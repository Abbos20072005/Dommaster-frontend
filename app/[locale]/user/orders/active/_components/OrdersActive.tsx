'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { OrderList } from '@/app/[locale]/user/orders/_components';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { getOrdersActive } from '@/utils/api/requests';

export const OrdersActive = () => {
  const t = useTranslations();
  const getOrdersActiveQuery = useInfiniteQuery({
    queryKey: ['ordersActive'],
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
      <div>
        <p className='text-muted-foreground text-sm'>
          {t('There are no orders from you on the site yet')}
        </p>
      </div>
    );
  }

  return (
    <>
      <OrderList orders={orders} />
      {getOrdersActiveQuery.hasNextPage && (
        <Button
          className='mt-4 w-full'
          disabled={getOrdersActiveQuery.isFetchingNextPage}
          size='sm'
          variant='outline'
          onClick={() => getOrdersActiveQuery.fetchNextPage()}
        >
          <Spinner show={getOrdersActiveQuery.isFetchingNextPage} />
          {t('Load more')}
        </Button>
      )}
    </>
  );
};
