'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeftIcon,
  BoxIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CreditCardIcon,
  DownloadIcon,
  InfoIcon,
  PhoneIcon,
  SendIcon,
  StoreIcon,
  TruckIcon,
  WalletIcon,
  XIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormatDate } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { cn, formatPhoneNumber, formatPrice } from '@/lib/utils';
import { AuthWrapper, useAuth } from '@/modules/auth';
import { getOrderById } from '@/utils/api/requests';
import { DELIVERY_TYPE } from '@/utils/constants';
import {
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SOCIAL_LINKS
} from '@/utils/constants/contacts';
import { getPaymentLabel, orderStatusMap } from '@/utils/constants/orderStatus';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';

import { OrderCancelAction } from './OrderCancelAction';
import { PayOrderDialog } from './PayOrderDialog';
import { useRepeatOrder } from './useRepeatOrder';

interface Props {
  /** which list the customer came from: the back link and the breadcrumb lead there */
  scope: 'active' | 'history';
}

const VISIBLE_ITEMS = 5;

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

const STEP_TEXT: Record<OrderStatus, string> = {
  0: 'Step placed text',
  1: 'Step collecting text',
  2: 'Step delivering text',
  3: 'Step delivered text',
  4: 'Step canceled text'
};

const Card = ({ className, ...props }: React.ComponentProps<'section'>) => (
  <section
    className={cn('border-border rounded-xl border bg-white p-6', className)}
    {...props}
  />
);

export const OrderDetails = ({ scope }: Props) => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [showAll, setShowAll] = React.useState(false);

  const orderQuery = useQuery({
    queryKey: ['orders', scope, id],
    queryFn: () => getOrderById({ id: +id })
  });
  const order = orderQuery.data?.data.result;
  const repeat = useRepeatOrder(+id);

  const backHref = `/user/orders/${scope}`;

  if (orderQuery.isLoading) {
    return (
      <AuthWrapper>
        <div className='grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_376px]' aria-busy='true'>
          <div className='grid gap-5'>
            <Skeleton className='h-24 w-full rounded-xl' />
            <Skeleton className='h-72 w-full rounded-xl' />
            <Skeleton className='h-48 w-full rounded-xl' />
          </div>
          <Skeleton className='h-96 w-full rounded-xl' />
        </div>
      </AuthWrapper>
    );
  }

  if (orderQuery.isError || !order) {
    return (
      <AuthWrapper>
        <div className='grid justify-items-center gap-2 py-16 text-center' role='alert'>
          <span className='text-xl font-bold'>{t('Could not load the order')}</span>
          <Button className='mt-3' onClick={() => orderQuery.refetch()}>
            {t('Try again')}
          </Button>
        </div>
      </AuthWrapper>
    );
  }

  const StatusIcon = STATUS_ICON[order.status];
  const isCanceled = order.status === 4;
  const isDelivery = order.delivery_type === DELIVERY_TYPE.Delivery;
  const isOnline = order.payment_type !== 4;
  const deliveryPrice = order.delivery_price ? Number(order.delivery_price) : 0;
  const goodsSum = order.order_items.reduce(
    (sum, { product, quantity }) => sum + (product.discount_price ?? product.price) * quantity,
    0
  );

  // the API gives only the current status: the earlier steps are done, the later ones wait
  const steps: { status: OrderStatus; label: string }[] = isCanceled
    ? [
        { status: 0, label: t('Step placed') },
        { status: 4, label: t(orderStatusMap[4]) }
      ]
    : ([0, 1, 2, 3] as OrderStatus[]).map((status) => ({
        status,
        label: status === 0 ? t('Step placed') : t(orderStatusMap[status])
      }));

  const items = showAll ? order.order_items : order.order_items.slice(0, VISIBLE_ITEMS);

  return (
    <AuthWrapper>
      <MobilePageHeader
        backHref={backHref}
        subtitle={formatDate(order.created_at, 'dd MMMM yyyy')}
        title={`${t('Order')} №${order.id}`}
      />
      <nav className='text-muted-foreground mb-5 hidden items-center gap-2 text-[13px] leading-[18px] md:flex'>
        <Link className='hover:text-foreground' href='/'>
          {t('Home')}
        </Link>
        <span>›</span>
        <Link className='hover:text-foreground' href='/user/dashboard'>
          {t('My cabinet')}
        </Link>
        <span>›</span>
        <Link className='hover:text-foreground' href={backHref}>
          {t('My orders')}
        </Link>
        <span>›</span>
        <span className='text-foreground'>
          {t('Order')} №{order.id}
        </span>
      </nav>

      <div className='grid items-start gap-5 px-4 md:px-0 lg:grid-cols-[minmax(0,1fr)_376px] lg:gap-8'>
        <div className='grid min-w-0 gap-5'>
          <div className='grid gap-3'>
            <Link
              className='text-primary hidden items-center gap-1 justify-self-start text-sm font-bold md:inline-flex'
              href={backHref}
            >
              <ArrowLeftIcon className='size-[18px]' />
              {t('Back to orders')}
            </Link>
            <div className='flex flex-wrap items-center gap-4'>
              <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
                {t('Order')} №{order.id}
              </h1>
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
            <span className='text-muted-foreground text-sm'>
              {formatDate(order.created_at, 'dd MMMM yyyy, HH:mm')}
            </span>
          </div>

          <Card>
            <h2 className='mb-5 text-[17px] leading-6 font-bold'>{t('Order status history')}</h2>
            <ol className='grid'>
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isCancel = step.status === 4;
                const done = isCancel ? true : order.status > step.status;
                const current = order.status === step.status;
                const reached = done || current;

                return (
                  <li key={step.status} className='grid grid-cols-[22px_minmax(0,1fr)] gap-4'>
                    <div className='flex flex-col items-center'>
                      <span
                        className={cn(
                          'flex size-[22px] shrink-0 items-center justify-center rounded-full border-2',
                          isCancel
                            ? 'border-[#B42318] bg-[#B42318]'
                            : reached
                              ? 'border-primary bg-primary'
                              : 'border-[#CBD2DB] bg-white'
                        )}
                      >
                        {isCancel ? (
                          <XIcon className='size-3 text-white' strokeWidth={3.2} />
                        ) : done ? (
                          <CheckIcon className='size-3 text-white' strokeWidth={3.2} />
                        ) : current ? (
                          <span className='size-2 rounded-full bg-white' />
                        ) : null}
                      </span>
                      {!isLast && (
                        <span
                          className={cn('my-1 w-0.5 flex-1', done ? 'bg-primary' : 'bg-[#E1E5EB]')}
                        />
                      )}
                    </div>
                    <div className={cn('grid gap-0.5', !isLast && 'pb-5')}>
                      <div className='flex items-baseline justify-between gap-4'>
                        <span
                          className={cn(
                            'text-[15px] leading-[22px]',
                            current ? 'font-bold' : !reached && 'text-muted-foreground'
                          )}
                        >
                          {step.label}
                        </span>
                        {step.status === 0 && (
                          <span className='text-muted-foreground text-[13px] tabular-nums'>
                            {formatDate(order.created_at, 'dd MMM, HH:mm')}
                          </span>
                        )}
                      </div>
                      {current && (
                        <span className='text-sm leading-5 text-[#4A5563]'>
                          {t(STEP_TEXT[step.status])}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card className='grid gap-4'>
            <h2 className='text-[17px] leading-6 font-bold'>{t('Delivery section')}</h2>
            <dl className='grid grid-cols-[160px_minmax(0,1fr)] gap-x-6 gap-y-3 text-sm leading-5'>
              <dt className='text-muted-foreground'>{t('Method')}</dt>
              <dd className='flex items-center gap-2'>
                {isDelivery ? (
                  <TruckIcon className='text-primary size-[18px]' />
                ) : (
                  <StoreIcon className='text-primary size-[18px]' />
                )}
                <strong className='font-bold'>{isDelivery ? t('Delivery') : t('Pickup')}</strong>
              </dd>
              <dt className='text-muted-foreground'>{t('Address')}</dt>
              <dd>
                {order.order_location?.name}
                {order.order_location?.location_name && (
                  <span className='text-muted-foreground block'>
                    {order.order_location.location_name}
                  </span>
                )}
              </dd>
              {user && (
                <>
                  <dt className='text-muted-foreground'>{t('Recipient')}</dt>
                  <dd className='tabular-nums'>
                    {user.full_name} · {formatPhoneNumber(user.phone_number)}
                  </dd>
                </>
              )}
            </dl>
          </Card>

          <Card className='pb-0'>
            <h2 className='mb-2 text-[17px] leading-6 font-bold'>
              {t('Order products')}{' '}
              <span className='text-muted-foreground font-normal'>{order.order_items.length}</span>
            </h2>
            <div className='grid'>
              {items.map(({ id: itemId, product, quantity }) => {
                const price = product.discount_price ?? product.price;
                return (
                  <div
                    key={itemId}
                    className='grid grid-cols-[64px_minmax(0,1fr)_140px] items-center gap-4 border-t border-[#EDF0F5] py-3.5'
                  >
                    <Link
                      className='relative size-16 overflow-hidden rounded-lg border border-border bg-white'
                      href={`/product/${product.id}`}
                    >
                      {product.images?.[0]?.image && (
                        <Image
                          fill
                          alt={product.name || 'Buildex'}
                          className='object-contain p-1'
                          sizes='64px'
                          src={product.images[0].image}
                        />
                      )}
                    </Link>
                    <div className='grid min-w-0 gap-1'>
                      <Link
                        className='hover:text-primary line-clamp-2 text-sm leading-5 transition-colors'
                        href={`/product/${product.id}`}
                      >
                        {product.name}
                      </Link>
                      <div className='text-muted-foreground flex flex-wrap items-center gap-x-3 text-[13px] leading-[18px]'>
                        <span className='tabular-nums'>
                          {quantity} × {formatPrice(price)} {t('sum')}
                        </span>
                        {product.quantity === 0 && (
                          <span className='rounded bg-[#FDECEC] px-2 py-0.5 text-xs font-bold text-[#B42318]'>
                            {t('Out of stock')}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className='text-right text-[15px] leading-[22px] font-bold whitespace-nowrap tabular-nums'>
                      {formatPrice(price * quantity)} <span className='text-[13px]'>{t('sum')}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            {order.order_items.length > VISIBLE_ITEMS && (
              <button
                className='text-primary hover:bg-primary/5 -mx-6 flex h-12 w-[calc(100%+3rem)] items-center justify-center gap-1.5 rounded-b-xl border-t border-border text-sm font-bold transition-colors'
                type='button'
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? t('Collapse') : t('Show all products')}
                {showAll ? (
                  <ChevronUpIcon className='size-4' />
                ) : (
                  <ChevronDownIcon className='size-4' />
                )}
              </button>
            )}
            {order.order_items.length <= VISIBLE_ITEMS && <div className='h-6' />}
          </Card>
        </div>

        <aside className='sticky top-4 grid gap-4'>
          <Card className='grid gap-4'>
            <h2 className='text-[17px] leading-6 font-bold'>{t('Order summary')}</h2>
            <div className='grid gap-2.5 text-sm'>
              <div className='flex justify-between gap-3'>
                <span className='text-[#4A5563]'>
                  {t('Goods')} ({order.order_items.length})
                </span>
                <span className='whitespace-nowrap tabular-nums'>
                  {formatPrice(goodsSum)} {t('sum')}
                </span>
              </div>
              {isDelivery && (
                <div className='flex justify-between gap-3'>
                  <span className='text-[#4A5563]'>{t('Delivery cost')}</span>
                  <span className='whitespace-nowrap tabular-nums'>
                    {deliveryPrice > 0 ? `${formatPrice(deliveryPrice)} ${t('sum')}` : t('Free')}
                  </span>
                </div>
              )}
            </div>
            <div className='border-border flex items-baseline justify-between gap-3 border-t pt-4'>
              <span className='text-[17px] font-bold'>{t('Total')}</span>
              <span className='text-2xl leading-[30px] font-bold whitespace-nowrap tabular-nums'>
                {formatPrice(order.total_price)} <span className='text-base'>{t('sum')}</span>
              </span>
            </div>
            <div className='bg-muted flex items-start gap-2.5 rounded-lg p-3'>
              {isOnline ? (
                <CreditCardIcon className='size-5 shrink-0 text-[#4A5563]' />
              ) : (
                <WalletIcon className='size-5 shrink-0 text-[#4A5563]' />
              )}
              <div className='grid gap-0.5'>
                <span className='text-sm font-bold'>
                  {getPaymentLabel(t, order.payment_type, order.payment_method)}
                </span>
                {isOnline && (
                  <span
                    className={cn(
                      'text-[13px] font-semibold',
                      order.status === 0 ? 'text-[#7A5600]' : 'text-[#12703C]'
                    )}
                  >
                    {order.status === 0 ? t('Awaiting payment') : t('Paid')}
                  </span>
                )}
              </div>
            </div>

            <div className='grid gap-2'>
              {order.status === 0 && (
                <PayOrderDialog orderId={order.id}>
                  <Button className='h-11 w-full'>{t('Pay order')}</Button>
                </PayOrderDialog>
              )}
              <Button
                className='h-11 w-full'
                isLoading={repeat.isPending}
                variant={order.status === 0 ? 'outline' : 'default'}
                onClick={() => repeat.mutate()}
              >
                {t('Repeat order')}
              </Button>
              <span className='text-muted-foreground flex items-start gap-1.5 text-[13px] leading-[18px]'>
                <InfoIcon className='mt-0.5 size-3.5 shrink-0' />
                {t('Repeat order hint')}
              </span>
              {order.ofd_url && (
                <Button asChild className='mt-1 h-11 w-full' variant='outline'>
                  <a href={order.ofd_url} rel='noopener noreferrer' target='_blank'>
                    <DownloadIcon />
                    {t('Download receipt')}
                  </a>
                </Button>
              )}
            </div>

            {order.status === 0 && (
              <div className='grid gap-1'>
                <OrderCancelAction asChild orderId={order.id}>
                  <button
                    className='h-9 justify-self-start rounded-lg px-2 text-sm text-[#B42318] underline underline-offset-4 hover:bg-[#FDECEC]'
                    type='button'
                  >
                    {t('Cancel order link')}
                  </button>
                </OrderCancelAction>
                <span className='text-muted-foreground text-[13px] leading-[18px]'>
                  {t('Cancel order hint')}
                </span>
              </div>
            )}
          </Card>

          <Card className='grid gap-3.5 px-6 py-5'>
            <h2 className='text-[17px] leading-6 font-bold'>{t('Need help')}</h2>
            <a className='flex items-center gap-3' href={CONTACT_PHONE_HREF}>
              <span className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full'>
                <PhoneIcon className='size-[18px]' />
              </span>
              <span className='grid'>
                <span className='text-muted-foreground text-[13px] leading-[18px]'>
                  {t('Call centre')}
                </span>
                <span className='text-foreground text-[15px] leading-[22px] font-bold'>
                  {CONTACT_PHONE}
                </span>
              </span>
            </a>
            <div className='flex items-center gap-3'>
              <span className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full'>
                <ClockIcon className='size-[18px]' />
              </span>
              <span className='grid'>
                <span className='text-muted-foreground text-[13px] leading-[18px]'>
                  {t('Working hours')}
                </span>
                <span className='text-[15px] leading-[22px] font-bold'>
                  {t('Working hours value')}
                </span>
              </span>
            </div>
            {SOCIAL_LINKS.telegram && (
              <a
                className='border-primary text-primary hover:bg-primary/5 inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-bold'
                href={SOCIAL_LINKS.telegram}
                rel='noopener noreferrer'
                target='_blank'
              >
                <SendIcon className='size-[18px]' />
                {t('Write in Telegram')}
              </a>
            )}
          </Card>
        </aside>
      </div>
    </AuthWrapper>
  );
};
