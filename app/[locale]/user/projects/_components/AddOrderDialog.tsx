'use client';

import { useQuery } from '@tanstack/react-query';
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
import { formatMoney, LinkConflictDialog, useProLink } from '@/modules/pro';
import { getProUnlinkedOrders } from '@/utils/api/requests';

interface Props {
  projectId: number;
  children: React.ReactNode;
}

/** "Add order": the orders that still have items without a project; choosing one links them all. */
export const AddOrderDialog = ({ projectId, children }: Props) => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const [open, setOpen] = React.useState(false);
  const [busyOrder, setBusyOrder] = React.useState<number | null>(null);
  const linker = useProLink();

  const ordersQuery = useQuery({
    queryKey: ['pro', 'unlinked'],
    enabled: open,
    staleTime: 0,
    queryFn: () => getProUnlinkedOrders({ config: { params: { page: 1, page_size: 50 } } })
  });
  const orders = ordersQuery.data?.data.result.content ?? [];

  const add = async (orderId: number) => {
    setBusyOrder(orderId);
    const done = await linker.link(orderId, projectId);
    setBusyOrder(null);
    if (done) setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Add order')}</DialogTitle>
            <DialogDescription>{t('Add order hint')}</DialogDescription>
          </DialogHeader>

          <div className='grid max-h-[50vh] gap-2 overflow-y-auto'>
            {ordersQuery.isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className='h-16 w-full rounded-lg' key={index} />
              ))}
            {ordersQuery.isSuccess && !orders.length && (
              <p className='text-muted-foreground py-2 text-sm'>{t('No unlinked orders')}</p>
            )}
            {orders.map((order) => (
              <div
                className='border-border flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5'
                key={order.id}
              >
                <div className='grid min-w-0 gap-0.5'>
                  <span className='text-[15px] leading-5 font-bold'>
                    {t('Order')} №{order.id}
                  </span>
                  <span className='text-muted-foreground text-[13px] leading-[18px]'>
                    {formatDate(order.created_at, 'dd MMM yyyy')} · {formatMoney(order.total_price)}{' '}
                    {t('sum')} · {t('Unlinked items count', { count: order.unlinked_items_count })}
                  </span>
                </div>
                <Button
                  isLoading={busyOrder === order.id}
                  size='sm'
                  onClick={() => add(order.id)}
                >
                  {t('Link')}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <LinkConflictDialog
        conflict={linker.conflict}
        pending={linker.pending}
        onCancel={linker.cancelConflict}
        onConfirm={async () => {
          if (await linker.confirmConflict()) setOpen(false);
        }}
      />
    </>
  );
};
