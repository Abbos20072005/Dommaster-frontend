'use client';

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  MapPinIcon,
  MessageSquareIcon,
  PackageIcon,
  TicketIcon,
  UserIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormatDate, useMounted } from '@/hooks';
import { LogoutConfirm } from '@/app/[locale]/user/_components/LogoutConfirm';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { AuthDialog, useAuth } from '@/modules/auth';
import { getOrdersActive, getOrdersHistory } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';
import { orderStatusMap } from '@/utils/constants/orderStatus';
import { useFavoritesStore } from '@/utils/stores';

const STEPS: OrderStatus[] = [0, 1, 2, 3];

const initialsOf = (name?: string) =>
  (name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const maskPhone = (phone?: string) => {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length < 12) return phone ?? '';
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
};

interface Row {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  muted?: boolean;
}

/** A white group of rows: an icon, a title, an optional counter and a chevron. */
const Group = ({ title, rows }: { title: string; rows: Row[] }) => (
  <div className='mx-4 mt-6'>
    <div className='px-1 pb-2 text-xs leading-4 font-bold tracking-wide text-[#6B7685] uppercase'>
      {title}
    </div>
    <div className='overflow-hidden rounded-2xl bg-white'>
      {rows.map((row, index) => (
        <Link
          href={row.href}
          key={row.href}
          className='flex items-center gap-3 pl-4 active:bg-[#EEF4FF]'
        >
          <row.icon className='size-6 shrink-0 text-[#6B7685]' />
          <span
            className={cn(
              'flex min-h-[52px] flex-1 items-center gap-2 pr-3',
              index < rows.length - 1 && 'border-b border-[#E1E5EB]'
            )}
          >
            <span className='flex-1'>{row.label}</span>
            {!!row.badge && (
              <span
                className={cn(
                  'h-[22px] min-w-[22px] rounded-full px-1.5 text-center text-xs leading-[22px] font-bold',
                  row.muted ? 'bg-[#EDF0F5] text-[#333C49]' : 'bg-primary text-white'
                )}
              >
                {row.badge}
              </span>
            )}
            <ChevronRightIcon className='size-5 text-[#9AA4B2]' />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export const MobileCards = () => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const { user, isPending } = useAuth();
  const { favorites } = useFavoritesStore();
  const mounted = useMounted();

  const activeQuery = useQuery({
    queryKey: ['dashboard', 'active'],
    enabled: !!user,
    queryFn: () => getOrdersActive({ config: { params: { page: 1, page_size: 1 } } })
  });
  const historyQuery = useQuery({
    queryKey: ['dashboard', 'history'],
    enabled: !!user,
    queryFn: () => getOrdersHistory({ config: { params: { page: 1, page_size: 1 } } })
  });

  // the token cookie exists only in the browser: show the same skeleton on the server and on the
  // first client render, so the HTML matches
  if (!mounted || (!!Cookies.get(COOKIES.ACCESS_TOKEN) && isPending)) {
    return (
      <div className='px-4 pt-4 md:hidden'>
        <Skeleton className='h-20 w-full rounded-2xl' />
        <Skeleton className='mt-3 h-64 w-full rounded-2xl' />
      </div>
    );
  }

  const activeOrder = activeQuery.data?.data.result.content[0];
  const activeCount = activeQuery.data?.data.result.totalElements ?? 0;
  const lastOrder = activeOrder ?? historyQuery.data?.data.result.content[0];

  const purchases: Row[] = [
    { href: '/user/orders/active', label: t('My orders'), icon: PackageIcon, badge: activeCount },
    { href: '/user/orders/history', label: t('Purchase history'), icon: ClockIcon }
  ];
  const profile: Row[] = [
    { href: '/user/personal-info', label: t('Personal info'), icon: UserIcon },
    { href: '/user/addresses', label: t('My addresses'), icon: MapPinIcon },
    { href: '/user/reviews', label: t('My reviews and questions'), icon: MessageSquareIcon },
    { href: '/user/promo', label: t('Promo codes'), icon: TicketIcon }
  ];
  const goods: Row[] = [
    {
      href: '/user/favorites',
      label: t('Favorites'),
      icon: HeartIcon,
      badge: favorites.length,
      muted: true
    },
    { href: '/user/products-history', label: t('Viewed products'), icon: EyeIcon }
  ];

  return (
    <div className='pb-4 md:hidden'>
      <div className='bg-white px-4 pt-2 pb-4'>
        <h1 className='text-[22px] leading-7 font-bold'>{t('My cabinet')}</h1>
      </div>

      {!user ? (
        <div className='mx-4 mt-3 rounded-2xl bg-white p-4'>
          <p className='mb-3 font-semibold'>{t('Login to manage your account')}</p>
          <div className='grid grid-cols-2 gap-2'>
            <AuthDialog asChild>
              <Button className='h-11'>{t('Register')}</Button>
            </AuthDialog>
            <AuthDialog asChild>
              <Button className='h-11' variant='outline'>
                {t('Login')}
              </Button>
            </AuthDialog>
          </div>
        </div>
      ) : (
        <>
          <Link
            href='/user/personal-info'
            className='mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white py-3.5 pr-3 pl-4'
          >
            <span className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full text-base font-bold'>
              {initialsOf(user.full_name) || <UserIcon className='size-6' />}
            </span>
            <span className='grid min-w-0 flex-1'>
              <span className='truncate text-base leading-[22px] font-bold'>{user.full_name}</span>
              <span className='text-sm leading-5 text-[#6B7685] tabular-nums'>
                {maskPhone(user.phone_number)}
              </span>
            </span>
            <ChevronRightIcon className='size-5 text-[#9AA4B2]' />
          </Link>

          {lastOrder ? (
            <div className='mx-4 mt-3 grid gap-4 rounded-2xl bg-white px-4 pt-4'>
              <div className='flex items-start justify-between gap-3'>
                <div className='grid'>
                  <span className='text-xs leading-4 font-bold tracking-wide text-[#6B7685] uppercase'>
                    {activeOrder ? t('Active order') : t('Last order')}
                  </span>
                  <span className='mt-1 text-[17px] leading-6 font-bold'>
                    {t('Order')} № {lastOrder.id}
                  </span>
                  <span className='text-[13px] leading-[18px] text-[#6B7685]'>
                    {formatDate(lastOrder.created_at, 'dd MMMM')} ·{' '}
                    {t('{count} products', { count: lastOrder.order_items.length })}
                  </span>
                </div>
                <span className='bg-primary/10 text-primary inline-flex h-[26px] items-center rounded-full px-2.5 text-xs font-bold whitespace-nowrap'>
                  {t(orderStatusMap[lastOrder.status])}
                </span>
              </div>

              {activeOrder && lastOrder.status !== 4 && (
                <div className='grid grid-cols-4'>
                  {STEPS.map((step, index) => {
                    const done = lastOrder.status > step;
                    const current = lastOrder.status === step;
                    return (
                      <div key={step} className='grid gap-2'>
                        <div className='flex items-center'>
                          <span
                            className={cn(
                              'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                              done || current
                                ? 'border-primary bg-primary'
                                : 'border-[#CBD2DB] bg-white'
                            )}
                          >
                            {done && <CheckIcon className='size-2.5 text-white' strokeWidth={3.4} />}
                            {current && <span className='size-1.5 rounded-full bg-white' />}
                          </span>
                          {index < STEPS.length - 1 && (
                            <span
                              className={cn('h-0.5 flex-1', done ? 'bg-primary' : 'bg-[#E1E5EB]')}
                            />
                          )}
                        </div>
                        <span
                          className={cn(
                            'text-xs leading-4',
                            current ? 'font-bold' : !done && 'text-[#6B7685]'
                          )}
                        >
                          {t(orderStatusMap[step])}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className='flex items-center gap-2'>
                {lastOrder.order_items.slice(0, 4).map((item) => (
                  <span
                    key={item.id}
                    className='relative size-12 overflow-hidden rounded-lg border border-[#E1E5EB] bg-white'
                  >
                    <Image
                      fill
                      alt='Buildex'
                      className='object-contain p-1'
                      sizes='48px'
                      src={item.image}
                    />
                  </span>
                ))}
                {lastOrder.order_items.length > 4 && (
                  <span className='flex size-12 items-center justify-center rounded-lg bg-[#EDF0F5] text-sm font-bold text-[#333C49]'>
                    +{lastOrder.order_items.length - 4}
                  </span>
                )}
              </div>

              <div className='flex items-baseline justify-between'>
                <span className='text-sm text-[#6B7685]'>{t('Total')}</span>
                <span className='text-xl leading-[26px] font-bold tabular-nums'>
                  {formatPrice(lastOrder.total_price)} <span className='text-sm'>{t('sum')}</span>
                </span>
              </div>

              <div className='grid gap-2'>
                <Link
                  href={`/user/orders/${activeOrder ? 'active' : 'history'}/${lastOrder.id}`}
                  className='bg-primary active:bg-primary/80 flex h-11 items-center justify-center rounded-lg text-[15px] font-bold text-white'
                >
                  {t('Details')}
                </Link>
                <Link
                  href='/about'
                  className='border-primary text-primary flex h-11 items-center justify-center rounded-lg border bg-white text-[15px] font-bold active:bg-primary/5'
                >
                  {t('Help with the order')}
                </Link>
              </div>

              <Link
                href={activeOrder ? '/user/orders/active' : '/user/orders/history'}
                className='-mx-4 flex min-h-12 items-center justify-between border-t border-[#E1E5EB] pr-3 pl-4 text-[15px] font-bold'
              >
                {activeOrder && activeCount > 1
                  ? `${t('All orders')} (${activeCount})`
                  : t('All orders')}
                <ChevronRightIcon className='size-5' />
              </Link>
            </div>
          ) : (
            !activeQuery.isLoading &&
            !historyQuery.isLoading && (
              <div className='mx-4 mt-3 grid justify-items-start gap-2.5 rounded-2xl bg-white px-4 pt-5 pb-4'>
                <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full'>
                  <PackageIcon className='size-6' />
                </span>
                <span className='mt-1 text-[17px] leading-6 font-bold'>
                  {t('Your orders will appear here')}
                </span>
                <span className='text-sm leading-5 text-[#4A5563]'>
                  {t('Choose products in the catalog and place an order')}
                </span>
                <Link
                  href='/catalog'
                  className='bg-primary mt-1.5 flex h-11 w-full items-center justify-center rounded-lg text-[15px] font-bold text-white'
                >
                  {t('Go to catalog')}
                </Link>
              </div>
            )
          )}

          <Group rows={purchases} title={t('Purchases')} />
          <Group rows={profile} title={t('Profile')} />
          <Group rows={goods} title={t('Products')} />

          <LogoutConfirm>
            <button
              className='mx-auto mt-6 block h-11 rounded-lg px-6 text-[15px] text-[#6B7685] active:bg-[#E1E5EB]'
              type='button'
            >
              {t('Logout')}
            </button>
          </LogoutConfirm>
        </>
      )}
    </div>
  );
};
