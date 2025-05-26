'use client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ArrowLeftIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

import { OrderCancelAction } from '@/app/[locale]/user/orders/_components/OrderCancelAction';
import { OrderPayDialog } from '@/app/[locale]/user/orders/_components/OrderPayDialog';
import { OrderProducts } from '@/app/[locale]/user/orders/active/[id]/_components/OrderProducts';
import { AuthWrapper } from '@/components/modules/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { getOrderById } from '@/utils/api/requests';
import { orderStatusColorMap, orderStatusMap } from '@/utils/constants/orderStatus';

const OrderPage = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const getOrderIdQuery = useQuery({
    queryKey: ['ordersActive', id],
    queryFn: () => getOrderById({ id: +id })
  });

  const order = getOrderIdQuery.data?.data.result;

  if (getOrderIdQuery.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (!order) return null;

  return (
    <AuthWrapper>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/orders/active'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <div className='flex-1 text-center'>
          <h1 className='text-center font-bold md:hidden'>
            {t('Order')} #{order.id}
          </h1>
          <CardDescription className='text-xs'>
            {format(order.created_at, 'dd MMM')}
          </CardDescription>
        </div>
        <div className='size-13' />
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <div className='mb-3 hidden gap-2 border-b pb-3 md:flex'>
          <div className='flex flex-1 gap-2'>
            <Button asChild size='icon' variant='ghost'>
              <Link href='/user/orders/active'>
                <ArrowLeftIcon className='text-muted-foreground size-5' />
              </Link>
            </Button>
            <div>
              <h1 className='text-2xl font-bold'>
                {t('Order')} #{order.id}
              </h1>
              <CardDescription>{format(order.created_at, 'dd MMM')}</CardDescription>
            </div>
          </div>
          {order.status === 0 && (
            <>
              <OrderPayDialog asChild orderId={order.id}>
                <Button size='sm' variant='primaryFlat'>
                  {t('Pay order')}
                </Button>
              </OrderPayDialog>
              <OrderCancelAction asChild orderId={order.id}>
                <Button size='sm' variant='destructiveFlat'>
                  <XIcon />
                  {t('Cancel')}
                </Button>
              </OrderCancelAction>
            </>
          )}
          <div className='ml-4 flex flex-col items-end gap-1'>
            <span className='text-lg font-bold'>
              {formatPrice(order.total_price)} {t('sum')}
            </span>
            <span className='text-sm'>
              <Badge className={cn(orderStatusColorMap[order.status])} variant='outline'>
                {t(orderStatusMap[order.status])}
              </Badge>
            </span>
          </div>
        </div>
        <div className='mb-4 grid grid-cols-2 gap-2 md:hidden'>
          {order.status === 0 && (
            <>
              <OrderPayDialog asChild orderId={order.id}>
                <Button size='sm' variant='primaryFlat'>
                  {t('Pay order')}
                </Button>
              </OrderPayDialog>
              <OrderCancelAction asChild orderId={order.id}>
                <Button size='sm' variant='destructiveFlat'>
                  <XIcon />
                  {t('Cancel order')}
                </Button>
              </OrderCancelAction>
            </>
          )}
        </div>
        <div className='mb-4 flex justify-between gap-1 md:hidden'>
          <span className='text-sm'>
            <Badge className={cn(orderStatusColorMap[order.status])} variant='outline'>
              {t(orderStatusMap[order.status])}
            </Badge>
          </span>
          <span className='font-bold'>
            {formatPrice(order.total_price)} {t('sum')}
          </span>
        </div>
        <OrderProducts order={order} />
      </Card>
    </AuthWrapper>
  );
};

export default OrderPage;
