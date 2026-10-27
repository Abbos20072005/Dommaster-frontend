'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, FolderPlusIcon, LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormatDate } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { formatMoney, ProjectFormDialog, useIsPro } from '@/modules/pro';
import { getProDashboard, getProUnlinkedOrders } from '@/utils/api/requests';

const MAX_PROJECTS = 6;

/** how many copies of the block are on the page now */
let mounted = 0;

/** The orders that still have items without a project: each leads to the order page to link them. */
const UnlinkedOrdersDialog = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const [open, setOpen] = React.useState(false);

  const ordersQuery = useQuery({
    queryKey: ['pro', 'unlinked'],
    enabled: open,
    staleTime: 0,
    queryFn: () => getProUnlinkedOrders({ config: { params: { page: 1, page_size: 50 } } })
  });
  const orders = ordersQuery.data?.data.result.content ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Unlinked purchases')}</DialogTitle>
          <DialogDescription>{t('Unlinked purchases hint')}</DialogDescription>
        </DialogHeader>
        <div className='grid max-h-[50vh] gap-2 overflow-y-auto'>
          {ordersQuery.isLoading && <Skeleton className='h-16 w-full rounded-lg' />}
          {orders.map((order) => (
            <Link
              className='border-border hover:bg-muted flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 transition-colors'
              href={`/user/orders/active/${order.id}`}
              key={order.id}
            >
              <span className='grid min-w-0 gap-0.5'>
                <span className='text-[15px] leading-5 font-bold'>
                  {t('Order')} №{order.id}
                </span>
                <span className='text-muted-foreground text-[13px] leading-[18px]'>
                  {formatDate(order.created_at, 'dd MMM yyyy')} · {formatMoney(order.total_price)}{' '}
                  {t('sum')} · {t('Unlinked items count', { count: order.unlinked_items_count })}
                </span>
              </span>
              <ChevronRightIcon className='text-muted-foreground size-5 shrink-0' />
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * PRO block of the cabinet home: what all the active projects cost, the orders that are not
 * linked yet and a card for each project (BLD-296). Nothing is shown to an ordinary customer.
 */
export const ProDashboard = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const { isPro } = useIsPro();

  const dashboardQuery = useQuery({
    queryKey: ['pro', 'dashboard'],
    enabled: isPro,
    staleTime: 0,
    queryFn: () => getProDashboard()
  });
  const unlinkedQuery = useQuery({
    queryKey: ['pro', 'unlinked-count'],
    enabled: isPro,
    staleTime: 0,
    queryFn: () => getProUnlinkedOrders({ config: { params: { page: 1, page_size: 1 } } })
  });

  // the page holds the phone and the laptop layout at once (two copies of this block): one event
  React.useEffect(() => {
    if (!isPro) return;
    if (mounted++ === 0) trackEvent('pro_dashboard_viewed', { platform: 'web' });
    return () => {
      mounted--;
    };
  }, [isPro]);

  if (!isPro) return null;

  const projects = (dashboardQuery.data?.data.result.projects ?? []).filter(
    (project) => project.status === 'active'
  );
  const total = projects.reduce((sum, project) => sum + Number(project.total), 0);
  const unlinked = unlinkedQuery.data?.data.result.totalElements ?? 0;

  return (
    <section className={cn('border-border grid gap-4 rounded-2xl border bg-white p-4 md:rounded-xl md:p-6', className)}>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='grid gap-0.5'>
          <h2 className='text-[17px] leading-6 font-bold md:text-xl'>{t('My projects')}</h2>
          {dashboardQuery.isLoading ? (
            <Skeleton className='h-8 w-48' />
          ) : (
            <>
              <span className='text-2xl leading-8 font-bold tabular-nums'>
                {formatMoney(total)} <span className='text-base'>{t('sum')}</span>
              </span>
              <span className='text-muted-foreground text-[13px] leading-[18px]'>
                {t('Total spent on active projects', { count: projects.length })}
              </span>
            </>
          )}
        </div>
        <Link
          className='text-primary inline-flex items-center gap-0.5 text-sm font-bold'
          href='/user/projects'
        >
          {t('All projects')}
          <ChevronRightIcon className='size-4' />
        </Link>
      </div>

      {unlinked > 0 && (
        <UnlinkedOrdersDialog>
          <button
            className='bg-primary/10 text-primary hover:bg-primary/15 flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-left text-sm font-bold transition-colors'
            type='button'
          >
            <LinkIcon className='size-4 shrink-0' />
            {t('Unlinked orders count', { count: unlinked })}
          </button>
        </UnlinkedOrdersDialog>
      )}

      {dashboardQuery.isSuccess && !projects.length && (
        <div className='bg-muted grid justify-items-center gap-2 rounded-xl px-4 py-8 text-center'>
          <FolderPlusIcon className='text-primary size-9' />
          <span className='text-lg font-bold'>{t('Open your first project')}</span>
          <ProjectFormDialog>
            <Button>{t('Open project')}</Button>
          </ProjectFormDialog>
        </div>
      )}

      {projects.length > 0 && (
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.slice(0, MAX_PROJECTS).map((project) => (
            <Link
              className='border-border hover:border-primary/40 grid gap-1.5 rounded-xl border p-3.5 transition-colors'
              href={`/user/projects/${project.id}`}
              key={project.id}
            >
              <span className='truncate text-[15px] leading-5 font-bold'>{project.name}</span>
              <span className='text-lg leading-6 font-bold tabular-nums'>
                {formatMoney(project.total)} <span className='text-sm'>{t('sum')}</span>
              </span>
              <span className='text-muted-foreground text-[13px] leading-[18px]'>
                {t('Project orders count', { count: project.orders_count })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
