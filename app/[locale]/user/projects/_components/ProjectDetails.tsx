'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon, MapPinIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormatDate } from '@/hooks';
import { Link, useRouter } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { productHref } from '@/lib/urls';
import { formatMoney, ProjectActions } from '@/modules/pro';
import { getProProjectItems, getProProjectSummary } from '@/utils/api/requests';

import { AddOrderDialog } from './AddOrderDialog';

const PAGE_SIZE = 20;

type RangeMode = 'all' | 'month' | 'range';

const pad = (value: number) => String(value).padStart(2, '0');
const isoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** `from` / `to` of the date filter (both inclusive, both optional) */
const rangeParams = (mode: RangeMode, from: string, to: string) => {
  if (mode === 'month') {
    const now = new Date();
    return {
      from: isoDate(new Date(now.getFullYear(), now.getMonth(), 1)),
      to: isoDate(new Date(now.getFullYear(), now.getMonth() + 1, 0))
    };
  }
  if (mode === 'range') return { from: from || undefined, to: to || undefined };
  return {};
};

const Money = ({ value, className }: { value: string; className?: string }) => {
  const t = useTranslations();
  return (
    <span className={className}>
      {formatMoney(value)} <span className='text-[0.8em]'>{t('sum')}</span>
    </span>
  );
};

export const ProjectDetails = () => {
  const t = useTranslations();
  const router = useRouter();
  const formatDate = useFormatDate();
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = React.useState(1);
  const [mode, setMode] = React.useState<RangeMode>('all');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');

  const params = rangeParams(mode, from, to);

  const summaryQuery = useQuery({
    queryKey: ['pro', 'summary', id, params],
    staleTime: 0,
    placeholderData: keepPreviousData,
    queryFn: () => getProProjectSummary({ id, config: { params } })
  });
  const itemsQuery = useQuery({
    queryKey: ['pro', 'items', id, params, page],
    staleTime: 0,
    placeholderData: keepPreviousData,
    queryFn: () =>
      getProProjectItems({ id, config: { params: { ...params, page, page_size: PAGE_SIZE } } })
  });

  React.useEffect(() => {
    trackEvent('pro_project_opened', { project_id: Number(id), platform: 'web' });
  }, [id]);

  const summary = summaryQuery.data?.data.result;
  const project = summary?.project;
  const items = itemsQuery.data?.data.result;

  const changeMode = (next: RangeMode) => {
    setMode(next);
    setPage(1);
  };

  if (summaryQuery.isLoading) {
    return (
      <div className='grid gap-4 px-4 md:px-0'>
        <Skeleton className='h-10 w-72' />
        <Skeleton className='h-32 w-full rounded-xl' />
        <Skeleton className='h-64 w-full rounded-xl' />
      </div>
    );
  }

  if (summaryQuery.isError || !summary || !project) {
    return (
      <div className='grid justify-items-center gap-2 py-16 text-center' role='alert'>
        <span className='text-xl font-bold'>{t('Could not load project')}</span>
        <Button asChild className='mt-3'>
          <Link href='/user/projects'>{t('Back to projects')}</Link>
        </Button>
      </div>
    );
  }

  // the categories are shown from the biggest to the smallest; their sum is the sum of the goods
  const categories = [...summary.categories].sort((a, b) => Number(b.goods) - Number(a.goods));
  const goodsTotal = Number(summary.totals.goods);
  const hasPurchases = summary.totals.items_count > 0 || (items?.totalElements ?? 0) > 0;

  return (
    <>
      <MobilePageHeader backHref='/user/projects' title={project.name} />
      <div className='grid gap-5 px-4 md:px-0'>
        <Link
          className='text-primary hidden items-center gap-1 justify-self-start text-sm font-bold md:inline-flex'
          href='/user/projects'
        >
          <ArrowLeftIcon className='size-[18px]' />
          {t('Back to projects')}
        </Link>

        <div className='grid gap-2'>
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl leading-8 font-bold tracking-tight break-words md:text-[32px] md:leading-[38px]'>
              {project.name}
            </h1>
            {project.status === 'archived' && (
              <span className='bg-muted text-foreground/70 inline-flex h-7 items-center rounded-lg px-2.5 text-[13px] font-bold'>
                {t('Archive')}
              </span>
            )}
          </div>
          {project.address && (
            <span className='text-muted-foreground flex items-center gap-1.5 text-sm'>
              <MapPinIcon className='size-4 shrink-0' />
              {project.address}
            </span>
          )}
          {project.comment && <p className='text-sm leading-6 text-[#4A5563]'>{project.comment}</p>}
          <ProjectActions project={project} onDeleted={() => router.push('/user/projects')} />
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {(['all', 'month', 'range'] as RangeMode[]).map((value) => (
            <button
              className={cn(
                'h-9 rounded-full px-4 text-sm font-medium transition-colors',
                mode === value ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/70'
              )}
              key={value}
              type='button'
              onClick={() => changeMode(value)}
            >
              {value === 'all' ? t('All time') : value === 'month' ? t('This month') : t('Choose period')}
            </button>
          ))}
          {mode === 'range' && (
            <div className='flex items-center gap-2'>
              <Input
                aria-label={t('From date')}
                className='h-9 w-40'
                max={to || undefined}
                type='date'
                value={from}
                onChange={(event) => {
                  setFrom(event.target.value);
                  setPage(1);
                }}
              />
              <span className='text-muted-foreground'>—</span>
              <Input
                aria-label={t('To date')}
                className='h-9 w-40'
                min={from || undefined}
                type='date'
                value={to}
                onChange={(event) => {
                  setTo(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>

        <section className='border-border grid gap-4 rounded-xl border bg-white p-4 md:p-6'>
          <h2 className='text-[17px] leading-6 font-bold'>{t('Project expenses')}</h2>
          <dl className='grid grid-cols-2 gap-3 md:grid-cols-4'>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground text-[13px]'>{t('Goods')}</dt>
              <dd className='font-bold tabular-nums'>
                <Money value={summary.totals.goods} />
              </dd>
            </div>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground text-[13px]'>{t('Delivery cost')}</dt>
              <dd className='font-bold tabular-nums'>
                <Money value={summary.totals.delivery} />
              </dd>
            </div>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground text-[13px]'>{t('Total')}</dt>
              <dd className='text-lg font-bold tabular-nums'>
                <Money value={summary.totals.total} />
              </dd>
            </div>
            <div className='grid gap-0.5'>
              <dt className='text-muted-foreground text-[13px]'>{t('Orders')}</dt>
              <dd className='font-bold tabular-nums'>{summary.totals.orders_count}</dd>
            </div>
          </dl>
          <p className='text-muted-foreground text-[13px] leading-[18px]'>
            {t('Expenses are paid orders')}
          </p>
        </section>

        {categories.length > 0 && goodsTotal > 0 && (
          <section className='border-border grid gap-3 rounded-xl border bg-white p-4 md:p-6'>
            <h2 className='text-[17px] leading-6 font-bold'>{t('Expenses by category')}</h2>
            <ul className='grid gap-3'>
              {categories.map((category, index) => {
                const percent = (Number(category.goods) / goodsTotal) * 100;
                return (
                  <li className='grid gap-1' key={category.id ?? `none-${index}`}>
                    <div className='flex items-baseline justify-between gap-3 text-sm'>
                      <span className='min-w-0 truncate font-medium'>
                        {category.name || t('Without category')}
                      </span>
                      <span className='shrink-0 tabular-nums'>
                        <Money className='font-bold' value={category.goods} />
                        <span className='text-muted-foreground ml-2'>
                          {percent < 1 ? '<1' : Math.round(percent)}%
                        </span>
                      </span>
                    </div>
                    <div className='bg-muted h-2 overflow-hidden rounded-full'>
                      <div
                        className='bg-primary h-full rounded-full'
                        style={{ width: `${Math.max(percent, 1)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className='border-border grid gap-2 rounded-xl border bg-white p-4 md:p-6'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h2 className='text-[17px] leading-6 font-bold'>
              {t('Project items')}{' '}
              <span className='text-muted-foreground font-normal'>{items?.totalElements ?? 0}</span>
            </h2>
            {project.status === 'active' && (
              <AddOrderDialog projectId={project.id}>
                <Button size='sm' variant='outline'>
                  <PlusIcon />
                  {t('Add order')}
                </Button>
              </AddOrderDialog>
            )}
          </div>

          {itemsQuery.isLoading && <Skeleton className='h-40 w-full rounded-lg' />}
          {itemsQuery.isSuccess && !items?.content.length && (
            <p className='text-muted-foreground py-6 text-center text-sm'>
              {hasPurchases ? t('No items in period') : t('Link an order to this project')}
            </p>
          )}

          <div className='grid'>
            {items?.content.map((item) => (
              <div
                className='grid grid-cols-[56px_minmax(0,1fr)] gap-3 border-t border-[#EDF0F5] py-3.5 md:grid-cols-[56px_minmax(0,1fr)_150px]'
                key={item.id}
              >
                <Link
                  className='border-border relative size-14 overflow-hidden rounded-lg border bg-white'
                  href={productHref(item.product)}
                >
                  {item.product.image && (
                    <Image
                      fill
                      alt={item.product.name || 'Buildex'}
                      className='object-contain p-1'
                      sizes='56px'
                      src={item.product.image}
                    />
                  )}
                </Link>
                <div className='grid min-w-0 gap-1'>
                  <Link
                    className='hover:text-primary line-clamp-2 text-sm leading-5 transition-colors'
                    href={productHref(item.product)}
                  >
                    {item.product.name}
                  </Link>
                  <span className='text-muted-foreground text-[13px] leading-[18px]'>
                    {item.quantity} × {formatMoney(item.unit_price)} {t('sum')} ·{' '}
                    <Link
                      className='hover:text-foreground underline'
                      href={`/user/orders/history/${item.order_id}`}
                    >
                      {t('Order')} №{item.order_id}
                    </Link>{' '}
                    · {formatDate(item.order_created_at, 'dd MMM yyyy')}
                  </span>
                </div>
                <Money
                  className='col-span-2 text-right text-[15px] font-bold tabular-nums md:col-span-1'
                  value={item.total}
                />
              </div>
            ))}
          </div>

          {items && items.totalPages > 1 && (
            <div className='flex items-center justify-between gap-3 pt-2'>
              <Button
                disabled={items.first}
                size='sm'
                variant='outline'
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                {t('Back')}
              </Button>
              <span className='text-muted-foreground text-sm tabular-nums'>
                {page} / {items.totalPages}
              </span>
              <Button
                disabled={items.last}
                size='sm'
                variant='outline'
                onClick={() => setPage((prev) => prev + 1)}
              >
                {t('Next')}
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
