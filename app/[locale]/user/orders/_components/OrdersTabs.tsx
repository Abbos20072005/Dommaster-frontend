'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getOrdersActive } from '@/utils/api/requests';

/** "My orders" and the history are one page with two tabs; each tab has its own address. */
export const OrdersTabs = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const activeCount = useQuery({
    queryKey: ['orders', 'active', 'count'],
    staleTime: 60_000,
    queryFn: () => getOrdersActive({ config: { params: { page: 1, page_size: 1 } } })
  }).data?.data.result.totalElements;

  const tabs = [
    {
      href: '/user/orders/active',
      label: activeCount ? `${t('Active')} (${activeCount})` : t('Active')
    },
    { href: '/user/orders/history', label: t('History') }
  ];

  return (
    <div
      className='border-border inline-flex gap-1 rounded-[10px] border bg-[#EDF0F5] p-1'
      role='tablist'
    >
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            aria-selected={isActive}
            href={tab.href}
            key={tab.href}
            role='tab'
            className={cn(
              'inline-flex h-9 items-center rounded-lg px-4 text-sm font-semibold transition-colors',
              isActive
                ? 'text-foreground bg-white shadow-sm'
                : 'text-[#4A5563] hover:text-foreground'
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
