'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CheckIcon,
  ChevronRightIcon,
  HeartIcon,
  MapPinIcon,
  MessageSquareIcon,
  PackageIcon,
  TicketIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { useFormatDate } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { ProductList } from '@/modules/product';
import {
  getCategories,
  getOrderById,
  getOrdersActive,
  getOrdersHistory
} from '@/utils/api/requests';
import { orderStatusMap } from '@/utils/constants/orderStatus';
import { useFavoritesStore } from '@/utils/stores';

/** the order statuses a customer sees on the way: placed → collecting → on the way → delivered */
const STEPS: OrderStatus[] = [0, 1, 2, 3];

const statusBadgeClass: Record<OrderStatus, string> = {
  0: 'bg-muted text-foreground/70',
  1: 'bg-[#FFF7DB] text-[#7A5600]',
  2: 'bg-primary/10 text-primary',
  3: 'bg-[#E6F6EC] text-[#12703C]',
  4: 'bg-[#FDECEC] text-[#B42318]'
};

const Tile = ({
  href,
  icon: Icon,
  title,
  note
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  note: string;
}) => (
  <Link
    href={href}
    className='border-border grid gap-3 rounded-xl border bg-white p-4 transition hover:border-[#CBD2DB] hover:shadow-sm'
  >
    <div className='flex items-start justify-between'>
      <span className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full'>
        <Icon className='size-5' />
      </span>
      <ChevronRightIcon className='size-5 text-[#9AA4B2]' />
    </div>
    <div className='grid gap-0.5'>
      <span className='text-[15px] leading-[22px] font-bold'>{title}</span>
      <span className='text-muted-foreground text-[13px] leading-[18px]'>{note}</span>
    </div>
  </Link>
);

export const DesktopCards = () => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const { user } = useAuth();
  const { favorites } = useFavoritesStore();

  const activeQuery = useQuery({
    queryKey: ['dashboard', 'active'],
    enabled: !!user,
    queryFn: () => getOrdersActive({ config: { params: { page: 1, page_size: 1 } } })
  });
  const historyQuery = useQuery({
    queryKey: ['dashboard', 'history'],
    enabled: !!user,
    queryFn: () => getOrdersHistory({ config: { params: { page: 1, page_size: 5 } } })
  });
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const activeOrder = activeQuery.data?.data.result.content[0];
  const activeCount = activeQuery.data?.data.result.totalElements ?? 0;
  const historyOrders = historyQuery.data?.data.result.content ?? [];
  const lastDelivered = historyOrders.find((order) => order.status === 3);
  // the card of the page: the active order, else the last finished one
  const order = activeOrder ?? historyOrders[0];

  // "Buy again": the products of the last delivered order
  const boughtQuery = useQuery({
    queryKey: ['dashboard', 'bought', lastDelivered?.id],
    enabled: !!lastDelivered,
    queryFn: () => getOrderById({ id: lastDelivered!.id })
  });
  const boughtProducts =
    boughtQuery.data?.data.result.order_items.map((item) => item.product).filter(Boolean) ?? [];

  const isLoading = !!user && (activeQuery.isLoading || historyQuery.isLoading);
  const firstName = user?.full_name?.split(/\s+/)[0];

  return (
    <div className='hidden gap-8 md:grid'>
      <h1 className='text-[32px] leading-[38px] font-bold tracking-tight'>
        {firstName ? t('Hello, {name}', { name: firstName }) : t('My cabinet')}
      </h1>

      {isLoading && <Skeleton className='h-60 w-full rounded-xl' />}

      {!isLoading && order && (
        <section className='grid gap-3'>
          <div className='flex items-baseline justify-between gap-4'>
            <h2 className='text-xl leading-[26px] font-bold'>
              {activeOrder ? t('Active order') : t('Last order')}
            </h2>
            <Link
              href={activeOrder ? '/user/orders/active' : '/user/orders/history'}
              className='text-primary inline-flex items-center gap-0.5 text-sm font-bold'
            >
              {activeOrder && activeCount > 1
                ? `${t('All orders')} (${activeCount})`
                : t('All orders')}
              <ChevronRightIcon className='size-4' />
            </Link>
          </div>

          <div className='border-border grid gap-6 rounded-xl border bg-white p-6'>
            <div className='flex items-start justify-between gap-4'>
              <div className='grid gap-1'>
                <span className='text-xl leading-[26px] font-bold'>
                  {t('Order')} №{order.id}
                </span>
                <span className='text-muted-foreground text-[13px]'>
                  {formatDate(order.created_at, 'dd MMMM')} ·{' '}
                  {t('{count} products', { count: order.order_items.length })}
                </span>
              </div>
              <div className='grid justify-items-end gap-1.5'>
                <span
                  className={cn(
                    'inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-bold',
                    statusBadgeClass[order.status]
                  )}
                >
                  {t(orderStatusMap[order.status])}
                </span>
                {order.order_location?.name && (
                  <span className='text-[13px] text-[#4A5563]'>{order.order_location.name}</span>
                )}
              </div>
            </div>

            {activeOrder && order.status !== 4 && (
              <div className='grid grid-cols-4'>
                {STEPS.map((step, index) => {
                  const done = order.status > step;
                  const current = order.status === step;
                  return (
                    <div key={step} className='grid gap-2.5'>
                      <div className='flex items-center'>
                        <span
                          className={cn(
                            'flex size-6 shrink-0 items-center justify-center rounded-full border-2',
                            done || current
                              ? 'border-primary bg-primary'
                              : 'border-[#CBD2DB] bg-white'
                          )}
                        >
                          {done && <CheckIcon className='size-3.5 text-white' strokeWidth={3.2} />}
                          {current && <span className='size-2 rounded-full bg-white' />}
                        </span>
                        {index < STEPS.length - 1 && (
                          <span
                            className={cn('h-0.5 flex-1', done ? 'bg-primary' : 'bg-[#E1E5EB]')}
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          'pr-3 text-sm leading-5',
                          current ? 'font-bold' : done ? '' : 'text-muted-foreground'
                        )}
                      >
                        {t(orderStatusMap[step])}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className='border-border flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-5'>
              <div className='flex gap-2'>
                {order.order_items.slice(0, 4).map((item) => (
                  <span
                    key={item.id}
                    className='border-border relative size-14 overflow-hidden rounded-lg border bg-white'
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
                {order.order_items.length > 4 && (
                  <span className='bg-muted flex size-14 items-center justify-center rounded-lg text-sm font-bold'>
                    +{order.order_items.length - 4}
                  </span>
                )}
              </div>
              <div className='ml-auto grid text-right'>
                <span className='text-muted-foreground text-[13px]'>{t('Total')}</span>
                <span className='text-2xl leading-7 font-bold whitespace-nowrap tabular-nums'>
                  {formatPrice(order.total_price)} <span className='text-base'>{t('sum')}</span>
                </span>
              </div>
              <div className='flex gap-3'>
                <Link
                  href={`/user/orders/${activeOrder ? 'active' : 'history'}/${order.id}`}
                  className='bg-primary hover:bg-primary/90 inline-flex h-11 items-center rounded-lg px-5 text-sm font-bold whitespace-nowrap text-white'
                >
                  {t('Details')}
                </Link>
                <Link
                  href='/about'
                  className='border-primary text-primary hover:bg-primary/5 inline-flex h-11 items-center rounded-lg border bg-white px-5 text-sm font-bold whitespace-nowrap'
                >
                  {t('Help with the order')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {!isLoading && !order && (
        <section className='border-border grid gap-6 rounded-xl border bg-white p-7'>
          <div className='flex items-start gap-5'>
            <span className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full'>
              <PackageIcon className='size-6' />
            </span>
            <div className='grid max-w-[560px] gap-2'>
              <h2 className='text-xl leading-[26px] font-bold'>{t('Your orders will appear here')}</h2>
              <p className='text-sm text-[#4A5563]'>
                {t('Choose products in the catalog and place an order')}
              </p>
              <Link
                href='/catalog'
                className='bg-primary hover:bg-primary/90 mt-2 inline-flex h-11 items-center justify-self-start rounded-lg px-5 text-sm font-bold text-white'
              >
                {t('Go to catalog')}
              </Link>
            </div>
          </div>
          {!!categoriesQuery.data?.data.result.length && (
            <div className='border-border grid gap-3 border-t pt-6'>
              <span className='text-[17px] leading-6 font-bold'>{t('Popular categories')}</span>
              <div className='grid grid-cols-4 gap-4'>
                {categoriesQuery.data.data.result.slice(0, 4).map((category) => (
                  <Link
                    href={`/category/${category.id}`}
                    key={category.id}
                    className='bg-muted hover:bg-[#E1E7EC] relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-xl p-3.5 transition-colors'
                  >
                    <span className='relative z-1 text-[15px] leading-[22px]'>{category.name}</span>
                    <Image
                      alt={category.name || 'Buildex'}
                      className='size-18 self-end object-contain'
                      height={72}
                      src={category.image}
                      width={72}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className='grid grid-cols-4 gap-4'>
        <Tile
          href='/user/favorites'
          icon={HeartIcon}
          note={favorites.length ? t('{count} products', { count: favorites.length }) : t('No products')}
          title={t('Favorites')}
        />
        <Tile
          href='/user/addresses'
          icon={MapPinIcon}
          note={t('Delivery addresses')}
          title={t('My addresses')}
        />
        <Tile
          href='/user/promo'
          icon={TicketIcon}
          note={t('Buy with a profit')}
          title={t('Promo codes')}
        />
        <Tile
          href='/user/reviews'
          icon={MessageSquareIcon}
          note={t('Your reviews and questions')}
          title={t('My reviews and questions')}
        />
      </section>

      {boughtProducts.length > 0 && (
        <section className='grid gap-4'>
          <h2 className='text-xl leading-[26px] font-bold'>{t('Buy again')}</h2>
          <ProductList products={boughtProducts} />
        </section>
      )}
    </div>
  );
};
