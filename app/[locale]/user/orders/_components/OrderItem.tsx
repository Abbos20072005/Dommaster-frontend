'use client';

import {
  BoxIcon,
  CheckIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  TruckIcon,
  WalletIcon,
  XIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useFormatDate } from '@/hooks';
import { Link, usePathname } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { getPaymentLabel, orderStatusMap } from '@/utils/constants/orderStatus';

import { OrderCancelAction } from './OrderCancelAction';
import { PayOrderDialog } from './PayOrderDialog';
import { useRepeatOrder } from './useRepeatOrder';

interface Props {
  order: OrderPreview;
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  0: 'bg-muted text-foreground/70',
  1: 'bg-[#FFF7DB] text-[#7A5600]',
  2: 'bg-primary/10 text-primary',
  3: 'bg-[#E6F6EC] text-[#12703C]',
  4: 'bg-[#FDECEC] text-[#B42318]'
};

const STATUS_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  0: ClockIcon,
  1: BoxIcon,
  2: TruckIcon,
  3: CheckIcon,
  4: XIcon
};

export const OrderItem = ({ order }: Props) => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const pathname = usePathname();
  const url = `${pathname}/${order.id}`;
  const isDone = order.status === 3 || order.status === 4;
  const isOnline = order.payment_type !== 4;
  const StatusIcon = STATUS_ICON[order.status];
  const extra = order.order_items.length - 4;

  const repeatMutation = useRepeatOrder(order.id);

  return (
    <>
      {/* phone: a compact tappable card; the whole card opens the order */}
      <Link
        href={url}
        className='grid gap-3 rounded-2xl bg-white p-4 md:hidden'
      >
        <div className='flex items-start justify-between gap-3'>
          <span className='grid'>
            <span className='text-base leading-[22px] font-bold'>
              {t('Order')} №{order.id}
            </span>
            <span className='text-[13px] leading-[18px] text-[#6B7685]'>
              {formatDate(order.created_at, 'dd MMMM')} ·{' '}
              {t('{count} products', { count: order.order_items.length })}
            </span>
          </span>
          <span
            className={cn(
              'inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold whitespace-nowrap',
              STATUS_STYLE[order.status]
            )}
          >
            {t(orderStatusMap[order.status])}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          {order.order_items.slice(0, 3).map((item) => (
            <span
              key={item.id}
              className='relative size-11 shrink-0 overflow-hidden rounded-lg border border-[#E1E5EB] bg-white'
            >
              <Image
                fill
                alt='Buildex'
                className='object-contain p-1'
                sizes='44px'
                src={item.image}
              />
            </span>
          ))}
          {order.order_items.length > 3 && (
            <span className='flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#EDF0F5] text-[13px] font-bold text-[#333C49]'>
              +{order.order_items.length - 3}
            </span>
          )}
          <span className='ml-auto text-[17px] leading-6 font-bold whitespace-nowrap tabular-nums'>
            {formatPrice(order.total_price)} <span className='text-[13px]'>{t('sum')}</span>
          </span>
          <span className='text-[#9AA4B2]'>›</span>
        </div>
      </Link>

    <article className='border-border hidden gap-4 rounded-xl border bg-white px-6 py-5 md:grid'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-baseline gap-3'>
          <Link
            href={url}
            className='hover:text-primary text-[17px] leading-6 font-bold transition-colors'
          >
            {t('Order')} №{order.id}
          </Link>
          <span className='text-muted-foreground text-sm'>
            {formatDate(order.created_at, 'dd MMMM yyyy')}
          </span>
        </div>
        <span
          className={cn(
            'inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-bold',
            STATUS_STYLE[order.status]
          )}
        >
          <StatusIcon className='size-4' />
          {t(orderStatusMap[order.status])}
        </span>
      </div>

      <div className='grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8'>
        <div className='grid min-w-0 gap-3.5'>
          <div className='flex items-center gap-2'>
            {order.order_items.slice(0, 4).map((item) => (
              <span
                key={item.id}
                className='border-border relative size-14 shrink-0 overflow-hidden rounded-lg border bg-white'
              >
                <Image
                  fill
                  alt='Buildex'
                  className='object-contain p-1'
                  sizes='56px'
                  src={item.image}
                />
              </span>
            ))}
            {extra > 0 && (
              <span className='bg-[#EDF0F5] flex size-14 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-[#333C49]'>
                +{extra}
              </span>
            )}
            <span className='ml-2 text-sm whitespace-nowrap text-[#4A5563]'>
              {t('{count} products', { count: order.order_items.length })}
            </span>
          </div>
          <div className='grid gap-1.5 text-sm leading-5 text-[#333C49]'>
            {order.order_location?.name && (
              <span className='flex min-w-0 items-center gap-2'>
                <MapPinIcon className='size-4 shrink-0 text-[#6B7685]' />
                <span className='truncate' title={order.order_location.name}>
                  {order.order_location.name}
                </span>
              </span>
            )}
            <span className='flex flex-wrap items-center gap-2'>
              {isOnline ? (
                <CreditCardIcon className='size-4 text-[#6B7685]' />
              ) : (
                <WalletIcon className='size-4 text-[#6B7685]' />
              )}
              {getPaymentLabel(t, order.payment_type, order.payment_method)}
              {isOnline && (
                <>
                  <span className='text-[#CBD2DB]'>·</span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 font-semibold',
                      order.status === 0 ? 'text-[#7A5600]' : 'text-[#12703C]'
                    )}
                  >
                    {order.status === 0 ? (
                      <ClockIcon className='size-3.5' />
                    ) : (
                      <CheckIcon className='size-3.5' strokeWidth={2.4} />
                    )}
                    {order.status === 0 ? t('Awaiting payment') : t('Paid')}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
        <div className='grid justify-items-end text-right'>
          <span className='text-muted-foreground text-[13px] leading-[18px]'>{t('Total')}</span>
          <span className='text-2xl leading-[30px] font-bold whitespace-nowrap tabular-nums'>
            {formatPrice(order.total_price)} <span className='text-base'>{t('sum')}</span>
          </span>
        </div>
      </div>

      <div className='border-border flex items-center justify-end gap-2 border-t pt-4'>
        {order.status === 0 && (
          <>
            <OrderCancelAction asChild orderId={order.id}>
              <Button size='sm' variant='destructiveFlat'>
                <XIcon />
                {t('Cancel')}
              </Button>
            </OrderCancelAction>
            <PayOrderDialog orderId={order.id}>
              <Button size='sm' variant='primaryFlat'>
                {t('Pay order')}
              </Button>
            </PayOrderDialog>
          </>
        )}
        {!isDone && order.status !== 0 && (
          <Button asChild size='sm' variant='outline'>
            <Link href='/about'>{t('Help')}</Link>
          </Button>
        )}
        <Button asChild size='sm' variant={isDone ? 'outline' : 'default'}>
          <Link href={url}>{t('Details')}</Link>
        </Button>
        {isDone && (
          <Button
            isLoading={repeatMutation.isPending}
            size='sm'
            onClick={() => repeatMutation.mutate()}
          >
            {t('Repeat order')}
          </Button>
        )}
      </div>
    </article>
    </>
  );
};
