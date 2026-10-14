'use client';

import { useQuery } from '@tanstack/react-query';
import { TicketIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { PromoAddForm } from '@/app/[locale]/user/promo/components/PromoAddForm';
import { PromoCard } from '@/app/[locale]/user/promo/components/PromoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { getPromos } from '@/utils/api/requests';

type Tab = 'active' | 'history';

export const PromoList = () => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<Tab>('active');
  const [newCode, setNewCode] = React.useState<string | null>(null);
  const getPromosQuery = useQuery({
    queryKey: ['promos'],
    queryFn: () => getPromos()
  });

  const promos = getPromosQuery.data?.data.result ?? [];
  const now = Date.now();
  // the newest first: a just saved code is on top
  const active = promos
    .filter((promo) => new Date(promo.expires_at).getTime() >= now)
    .sort((a, b) => (a.code === newCode ? -1 : b.code === newCode ? 1 : 0));
  const history = promos.filter((promo) => new Date(promo.expires_at).getTime() < now);
  const hasAny = promos.length > 0;

  const tabs: { value: Tab; label: string }[] = [
    { value: 'active', label: active.length ? `${t('Active promos')} (${active.length})` : t('Active promos') },
    { value: 'history', label: t('Used and expired promos') }
  ];
  const shown = tab === 'active' ? active : history;

  return (
    <div className='grid gap-4 md:gap-5'>
      <PromoAddForm
        activeCodes={active.map((promo) => promo.code.toUpperCase())}
        expiredCodes={history.map((promo) => promo.code.toUpperCase())}
        onAdded={(code) => {
          setNewCode(code);
          setTab('active');
        }}
      />

      {getPromosQuery.isLoading && (
        <div className='grid gap-4 md:grid-cols-2' aria-busy='true'>
          {[0, 1].map((index) => (
            <Skeleton key={index} className='h-52 w-full rounded-2xl' />
          ))}
        </div>
      )}

      {!getPromosQuery.isLoading && !hasAny && (
        <div className='border-border grid justify-items-center gap-2 rounded-2xl border bg-white px-4 py-8 text-center md:rounded-xl md:px-6 md:py-14'>
          <span className='bg-primary/10 text-primary mb-1 flex size-12 items-center justify-center rounded-full md:mb-2 md:size-14'>
            <TicketIcon className='size-6' />
          </span>
          <span className='text-[17px] leading-6 font-bold md:text-xl md:leading-[26px]'>
            {t('No promo codes yet')}
          </span>
          <span className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>
            {t('No promo codes text')}
          </span>
        </div>
      )}

      {!getPromosQuery.isLoading && hasAny && (
        <>
          <div className='-mx-4 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden'>
            <div
              className='border-border inline-flex gap-1 rounded-[10px] border bg-[#EDF0F5] p-1'
              role='tablist'
            >
              {tabs.map((item) => (
                <button
                  aria-selected={tab === item.value}
                  className={cn(
                    'inline-flex h-9 shrink-0 items-center rounded-lg px-3.5 text-sm whitespace-nowrap transition-colors md:px-[18px]',
                    tab === item.value
                      ? 'text-foreground bg-white font-bold shadow-sm'
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
          </div>

          {shown.length ? (
            <div className='grid items-start gap-3 md:grid-cols-2 md:gap-4'>
              {shown.map((promo) => (
                <PromoCard
                  expired={tab === 'history'}
                  isNew={promo.code === newCode}
                  key={promo.id}
                  promo={promo}
                />
              ))}
            </div>
          ) : (
            <div className='border-border grid justify-items-center gap-1 rounded-2xl border bg-white px-4 py-6 text-center md:rounded-xl md:px-6 md:py-10'>
              <span className='text-base leading-6 font-bold md:text-[17px]'>
                {tab === 'active' ? t('No active promos') : t('Nothing here yet')}
              </span>
              <span className='text-sm leading-5 text-[#4A5563]'>
                {tab === 'active' ? t('No promo codes text') : t('Used promos here')}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
