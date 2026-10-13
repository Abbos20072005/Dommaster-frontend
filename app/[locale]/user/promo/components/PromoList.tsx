'use client';

import { useQuery } from '@tanstack/react-query';
import { TicketIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { PromoCard } from '@/app/[locale]/user/promo/components/PromoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getPromos } from '@/utils/api/requests';

type Tab = 'active' | 'history';

export const PromoList = () => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<Tab>('active');
  const getPromosQuery = useQuery({
    queryKey: ['promos'],
    queryFn: () => getPromos()
  });

  const promos = getPromosQuery.data?.data.result ?? [];
  const now = Date.now();
  const active = promos.filter((promo) => new Date(promo.expires_at).getTime() >= now);
  const history = promos.filter((promo) => new Date(promo.expires_at).getTime() < now);

  if (getPromosQuery.isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2' aria-busy='true'>
        {[0, 1].map((index) => (
          <Skeleton key={index} className='h-52 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!promos.length) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='bg-primary/10 text-primary mb-2 flex size-14 items-center justify-center rounded-full'>
          <TicketIcon className='size-6' />
        </span>
        <span className='text-xl leading-[26px] font-bold'>{t('No promo codes yet')}</span>
        <span className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>
          {t('No promo codes text')}
        </span>
        <Link
          href='/catalog'
          className='bg-primary hover:bg-primary/90 mt-3 inline-flex h-11 items-center rounded-lg px-5 text-sm font-bold text-white'
        >
          {t('Go to catalog')}
        </Link>
      </div>
    );
  }

  const tabs: { value: Tab; label: string }[] = [
    { value: 'active', label: `${t('Active promos')} (${active.length})` },
    { value: 'history', label: t('Used and expired promos') }
  ];
  const shown = tab === 'active' ? active : history;

  return (
    <div className='grid gap-5'>
      <div
        className='border-border inline-flex gap-1 justify-self-start rounded-[10px] border bg-[#EDF0F5] p-1'
        role='tablist'
      >
        {tabs.map((item) => (
          <button
            aria-selected={tab === item.value}
            className={cn(
              'inline-flex h-9 items-center rounded-lg px-3 text-sm font-semibold transition-colors md:px-4',
              tab === item.value
                ? 'text-foreground bg-white shadow-sm'
                : 'text-[#4A5563] hover:text-foreground'
            )}
            key={item.value}
            role='tab'
            type='button'
            onClick={() => setTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {shown.length ? (
        <div className='grid items-start gap-4 md:grid-cols-2'>
          {shown.map((promo) => (
            <PromoCard expired={tab === 'history'} key={promo.id} promo={promo} />
          ))}
        </div>
      ) : (
        <div className='border-border grid justify-items-center gap-1 rounded-xl border bg-white px-6 py-10 text-center'>
          <span className='text-[17px] leading-6 font-bold'>
            {tab === 'active' ? t('No active promos') : t('Nothing here yet')}
          </span>
          <span className='text-sm leading-5 text-[#4A5563]'>
            {tab === 'active' ? t('No promo codes text') : t('Used promos here')}
          </span>
        </div>
      )}
    </div>
  );
};
