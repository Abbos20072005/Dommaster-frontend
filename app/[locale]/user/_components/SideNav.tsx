'use client';

import { useQuery } from '@tanstack/react-query';
import {
  EyeIcon,
  HeartIcon,
  LogOutIcon,
  MapPinIcon,
  MessageSquareIcon,
  PackageIcon,
  TicketIcon,
  UserIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { getOrdersActive } from '@/utils/api/requests';
import { useFavoritesStore } from '@/utils/stores';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  /** the path prefix that keeps the item highlighted (defaults to href) */
  match?: string;
  /** a pale badge (a count), not the blue one (something that waits for the customer) */
  badgeMuted?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const initialsOf = (name?: string) =>
  (name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

/** +998 90 *** ** 00: the phone is shown with the middle hidden */
const maskPhone = (phone?: string) => {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length < 12) return phone ?? '';
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
};

export const SideNav = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const { user, reset } = useAuth();
  const { favorites } = useFavoritesStore();

  const activeOrdersQuery = useQuery({
    queryKey: ['orders', 'active', 'count'],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: () => getOrdersActive({ config: { params: { page: 1, page_size: 1 } } })
  });
  const activeOrders = activeOrdersQuery.data?.data.result.totalElements ?? 0;

  // the order page has no cabinet menu: "← All orders" leads back to the list
  if (/^\/user\/orders\/(active|history)\/[^/]+/.test(pathname)) return null;

  const groups: (NavGroup & { authorized: boolean })[] = [
    {
      title: 'Purchases',
      authorized: true,
      items: [
        {
          href: '/user/orders/active',
          label: 'My orders',
          icon: PackageIcon,
          badge: activeOrders || undefined,
          match: '/user/orders'
        }
      ]
    },
    {
      title: 'Profile',
      authorized: true,
      items: [
        { href: '/user/personal-info', label: 'Personal info', icon: UserIcon },
        { href: '/user/addresses', label: 'My addresses', icon: MapPinIcon },
        { href: '/user/reviews', label: 'My reviews and questions', icon: MessageSquareIcon },
        { href: '/user/promo', label: 'Promo codes', icon: TicketIcon }
      ]
    },
    {
      title: 'Products',
      authorized: false,
      items: [
        {
          href: '/user/favorites',
          label: 'Favorites',
          icon: HeartIcon,
          badge: favorites.length || undefined,
          badgeMuted: true
        },
        { href: '/user/products-history', label: 'Viewed products', icon: EyeIcon }
      ]
    }
  ];

  const onLogout = () => {
    reset();
    router.push('/');
  };

  return (
    <aside className='hidden w-70 shrink-0 md:block'>
      <nav className='border-border sticky top-4 grid rounded-xl border bg-white p-3'>
        {user && (
          <Link
            href='/user/dashboard'
            className='border-border flex items-center gap-3 border-b px-2 pt-2 pb-4'
          >
            <span className='bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full text-base font-bold'>
              {initialsOf(user.full_name)}
            </span>
            <span className='grid min-w-0 gap-0.5'>
              <span className='truncate text-base leading-[22px] font-bold'>{user.full_name}</span>
              <span className='text-muted-foreground text-[13px] tabular-nums'>
                {maskPhone(user.phone_number)}
              </span>
            </span>
          </Link>
        )}

        {groups.map((group) =>
          group.authorized && !user ? null : (
            <div key={group.title} className='grid gap-0.5 pt-3'>
              {group.items.map((item) => {
                const base = item.match ?? item.href;
                const isActive = pathname === base || pathname.startsWith(`${base}/`);
                const Icon = item.icon;

                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={cn(
                      'text-foreground/80 hover:bg-muted flex h-10 items-center gap-3 rounded-lg px-2 text-sm transition-colors',
                      isActive && 'bg-primary/10 text-primary font-semibold hover:bg-primary/10'
                    )}
                  >
                    <Icon
                      className={cn('size-5 shrink-0', isActive ? 'text-primary' : 'text-[#6B7685]')}
                    />
                    <span className='flex-1'>{t(item.label)}</span>
                    {!!item.badge && (
                      <span
                        className={cn(
                          'h-[22px] min-w-[22px] rounded-full px-1.5 text-center text-xs leading-[22px] font-bold',
                          item.badgeMuted ? 'bg-muted text-foreground/80' : 'bg-primary text-white'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )
        )}

        {user && (
          <div className='pt-0.5'>
            <button
              className='text-muted-foreground hover:bg-muted hover:text-foreground flex h-10 w-full items-center gap-3 rounded-lg px-2 text-sm transition-colors'
              type='button'
              onClick={onLogout}
            >
              <LogOutIcon className='size-5' />
              {t('Logout')}
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
};
