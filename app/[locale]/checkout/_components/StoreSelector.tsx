'use client';

import { useQuery } from '@tanstack/react-query';
import { ClockIcon, ExternalLinkIcon, MapPinIcon, PhoneIcon, StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { trackEvent } from '@/lib/analytics';
import { nextOpenDate, storeMapUrl, todayHours } from '@/lib/stores';
import { cn } from '@/lib/utils';
import { getStores } from '@/utils/api/requests';
import { useCheckoutStore } from '@/utils/stores';

/**
 * Pickup (BLD-315): the active shops in the order of the API; a shop that is closed now can be
 * chosen too (it is marked "closed now"). Until a shop is chosen the order cannot be confirmed.
 */
export const StoreSelector = () => {
  const t = useTranslations();
  const { storeId, setStoreId } = useCheckoutStore();

  const storesQuery = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores()
  });
  const stores = storesQuery.data?.data.result ?? [];

  if (storesQuery.isLoading) {
    return (
      <div className='space-y-2'>
        <Skeleton className='h-28 w-full rounded-xl' />
      </div>
    );
  }

  if (storesQuery.isError || !stores.length) {
    return (
      <div className='bg-background flex items-center gap-3 rounded-xl p-3'>
        <StoreIcon className='text-muted-foreground size-5 shrink-0' />
        <p className='text-muted-foreground text-sm'>{t('No stores available')}</p>
      </div>
    );
  }

  return (
    <div aria-label={t('Pickup store')} className='space-y-2' role='radiogroup'>
      {stores.map((store) => {
        const isSelected = storeId === store.id;
        const hours = todayHours(store);

        return (
          <div
            className={cn(
              'rounded-xl border-2 transition-colors',
              isSelected
                ? 'border-primary/50 bg-primary/5'
                : 'bg-background hover:border-primary/20 border-transparent'
            )}
            key={store.id}
          >
            <button
              aria-checked={isSelected}
              className='flex w-full cursor-pointer items-start gap-3 p-3 text-left'
              role='radio'
              type='button'
              onClick={() => {
                setStoreId(store.id);
                trackEvent('pickup_selected', { store_id: store.id, is_open_now: store.is_open_now });
              }}
            >
              <span
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isSelected ? 'border-primary' : 'border-muted-foreground/40'
                )}
              >
                {isSelected && <span className='bg-primary size-2.5 rounded-full' />}
              </span>
              <span className='min-w-0 flex-1 space-y-1'>
                <span className='flex flex-wrap items-center gap-2'>
                  <span className='text-sm font-semibold'>{store.name}</span>
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[11px] leading-4 font-bold',
                      store.is_open_now
                        ? 'bg-[#E6F6EC] text-[#12703C]'
                        : 'bg-[#FDECEC] text-[#B42318]'
                    )}
                  >
                    {store.is_open_now ? t('Open now') : t('Closed now')}
                  </span>
                </span>
                {!store.is_open_now && store.next_open && (
                  <span className='text-muted-foreground block text-xs'>
                    {t('Opens next', {
                      date: nextOpenDate(store.next_open),
                      time: store.next_open.time
                    })}
                  </span>
                )}
                {(store.address || store.landmark) && (
                  <span className='text-muted-foreground flex items-start gap-1.5 text-xs'>
                    <MapPinIcon className='mt-0.5 size-3.5 shrink-0' />
                    <span>
                      {store.address}
                      {store.address && store.landmark && ' · '}
                      {store.landmark}
                    </span>
                  </span>
                )}
                <span className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                  <ClockIcon className='size-3.5 shrink-0' />
                  {hours ? `${t('Today')}: ${hours}` : t('Day off today')}
                </span>
              </span>
            </button>
            <div className='flex flex-wrap items-center gap-x-4 gap-y-1 px-3 pb-3 pl-11 text-xs'>
              {store.phone && (
                <a
                  className='text-primary flex items-center gap-1'
                  href={`tel:${store.phone.replace(/\s/g, '')}`}
                >
                  <PhoneIcon className='size-3.5' />
                  {store.phone}
                </a>
              )}
              <a
                className='text-primary flex items-center gap-1'
                href={storeMapUrl(store)}
                rel='noopener noreferrer'
                target='_blank'
              >
                <ExternalLinkIcon className='size-3.5' />
                {t('View on map')}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
