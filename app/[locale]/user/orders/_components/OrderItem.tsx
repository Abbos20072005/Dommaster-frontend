'use client';

import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Link, usePathname } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { postPaymentHold } from '@/utils/api/requests';
import { orderStatusColorMap, orderStatusMap } from '@/utils/constants/orderStatus';

import { OrderCancelAction } from './OrderCancelAction';

interface Props {
  order: OrderPreview;
}

const PayOrderButton = ({ orderId }: { orderId: number }) => {
  const t = useTranslations();
  const mutation = useMutation({
    mutationFn: postPaymentHold
  });

  return (
    <Button
      isLoading={mutation.isPending}
      size='sm'
      variant='primaryFlat'
      onClick={() => mutation.mutate({ data: { order_id: orderId } })}
    >
      {t('Pay order')}
    </Button>
  );
};

export const OrderItem = ({ order }: Props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const url = `${pathname}/${order.id}`;

  return (
    <Card variant='outline'>
      <Link href={url}>
        <CardHeader className='flex flex-row items-start justify-between space-y-0 border-b p-4'>
          <div className='space-y-1'>
            <CardTitle className='text-base sm:leading-none md:text-lg'>
              {t('Order')} #{order.id}
            </CardTitle>
            <CardDescription>
              {format(order.created_at, 'dd MMM')} - {order.order_location?.name}
            </CardDescription>
          </div>
          <div className='flex flex-col-reverse items-end gap-1 sm:flex-row sm:items-center sm:gap-2'>
            <span className='text-sm'>
              <Badge className={cn(orderStatusColorMap[order.status])} variant='outline'>
                {t(orderStatusMap[order.status])}
              </Badge>
            </span>
            <span className='font-bold'>
              {formatPrice(order.total_price)} {t('sum')}
            </span>
          </div>
        </CardHeader>
      </Link>
      <Link href={url}>
        <CardContent className='flex gap-2 overflow-x-auto p-4'>
          {order.order_items.map((item) => (
            <div key={item.id} className='flex shrink-0 items-center justify-between'>
              <Image
                alt={item.image}
                className='bg-muted size-[60px] rounded-sm object-contain sm:size-[80px]'
                height={80}
                src={item.image}
                width={80}
              />
            </div>
          ))}
        </CardContent>
      </Link>
      <CardFooter className='flex flex-wrap gap-2 px-4 pb-4'>
        <Button asChild size='sm' variant='muted'>
          <Link href={url}>{t('Order details')}</Link>
        </Button>
        {order.status === 0 && (
          <>
            <PayOrderButton orderId={order.id} />
            <OrderCancelAction asChild orderId={order.id}>
              <Button size='sm' variant='destructiveFlat'>
                <XIcon />
                {t('Cancel')}
              </Button>
            </OrderCancelAction>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
