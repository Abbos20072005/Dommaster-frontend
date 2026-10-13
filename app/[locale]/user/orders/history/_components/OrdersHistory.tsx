'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ClockIcon, FilterIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { OrderList } from '@/app/[locale]/user/orders/_components';
import { OrdersEmpty } from '@/app/[locale]/user/orders/_components/OrdersEmpty';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { getOrdersHistory } from '@/utils/api/requests';

type Period = '3m' | '1y' | 'all';
type StatusFilter = 'all' | 3 | 4;

const PERIOD_DAYS: Record<Period, number | null> = { '3m': 92, '1y': 366, all: null };

export const OrdersHistory = () => {
  const t = useTranslations();
  const [period, setPeriod] = React.useState<Period>('3m');
  const [status, setStatus] = React.useState<StatusFilter>('all');

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

  const all = getOrdersHistoryQuery.data?.pages.flatMap((page) => page.data.result.content);

  // the period and the status are filtered here, over the loaded orders (newest first)
  const orders = React.useMemo(() => {
    const days = PERIOD_DAYS[period];
    const from = days ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;

    return (all ?? [])
      .filter((order) => new Date(order.created_at).getTime() >= from)
      .filter((order) => status === 'all' || order.status === status)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [all, period, status]);

  if (getOrdersHistoryQuery.isLoading) {
    return (
      <div className='grid gap-4' aria-busy='true'>
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className='h-52 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (getOrdersHistoryQuery.isError) {
    return (
      <div className='grid gap-3 py-10 text-center' role='alert'>
        <p className='text-xl font-bold'>{t('Could not load orders')}</p>
        <p className='text-muted-foreground text-sm'>{t('Network error, orders unchanged')}</p>
        <div>
          <Button onClick={() => getOrdersHistoryQuery.refetch()}>{t('Try again')}</Button>
        </div>
      </div>
    );
  }

  // the history holds only completed orders — active ones are in "My orders"
  if (!all?.length) {
    return (
      <OrdersEmpty
        action={{ href: '/catalog', label: t('Go to catalog') }}
        description={t('History description')}
        icon={<ClockIcon />}
        title={t('History is empty')}
      />
    );
  }

  const chips: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: t('All') },
    { value: 3, label: t('Delivered') },
    { value: 4, label: t('Canceled') }
  ];
  const isFiltered = status !== 'all' || period !== '3m';

  return (
    <div className='grid gap-5'>
      <div className='flex items-center gap-2'>
        {chips.map((chip) => (
          <button
            aria-pressed={status === chip.value}
            className={cn(
              'h-9 rounded-lg border px-3.5 text-sm font-semibold transition-colors',
              status === chip.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:bg-muted bg-white text-[#333C49]'
            )}
            key={String(chip.value)}
            type='button'
            onClick={() => setStatus(chip.value)}
          >
            {chip.label}
          </button>
        ))}
        <label className='ml-4 inline-flex items-center gap-2'>
          <span className='text-muted-foreground text-[13px]'>{t('Period')}</span>
          <select
            className='focus:border-primary h-9 cursor-pointer rounded-lg border border-[#CBD2DB] bg-white px-3 text-sm outline-none'
            value={period}
            onChange={(event) => setPeriod(event.target.value as Period)}
          >
            <option value='3m'>{t('For 3 months')}</option>
            <option value='1y'>{t('For a year')}</option>
            <option value='all'>{t('All time')}</option>
          </select>
        </label>
        <span className='text-muted-foreground ml-auto text-[13px]'>{t('Newest first')}</span>
      </div>

      {orders.length === 0 ? (
        <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-10 text-center'>
          <span className='bg-muted text-muted-foreground mb-1.5 flex size-12 items-center justify-center rounded-full'>
            <FilterIcon className='size-6' />
          </span>
          <span className='text-[17px] leading-6 font-bold'>{t('No orders match the filters')}</span>
          {isFiltered && (
            <button
              className='bg-primary/10 text-primary mt-2 h-9 rounded-lg px-3.5 text-[13px] font-bold'
              type='button'
              onClick={() => {
                setStatus('all');
                setPeriod('all');
              }}
            >
              {t('Reset filters')}
            </button>
          )}
        </div>
      ) : (
        <OrderList orders={orders} />
      )}

      {getOrdersHistoryQuery.hasNextPage && (
        <Button
          className='w-full'
          size='sm'
          variant='outline'
          isLoading={getOrdersHistoryQuery.isFetchingNextPage}
          onClick={() => getOrdersHistoryQuery.fetchNextPage()}
        >
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
