'use client';

import { useQuery } from '@tanstack/react-query';
import { ClockIcon, ExternalLinkIcon, InfoIcon, MapPinIcon, PhoneIcon, StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { storeMapUrl, todayHours } from '@/lib/stores';
import { getStores } from '@/utils/api/requests';

/**
 * "Pickup" block of the order (BLD-315): the shop, its address, phone, hours and a map link, and
 * the reminder that a ready order is kept for 2 days. The shop is the one saved in the order
 * (the snapshot of the placing time); what it lacks is taken from the current list of shops.
 */
export const PickupBlock = ({ order }: { order: Order }) => {
  const t = useTranslations();

  const storesQuery = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores()
  });

  const storeId = order.store?.id ?? order.store_id;
  const live = storesQuery.data?.data.result.find((store) => store.id === storeId);
  const store: Partial<Store> = { ...live, ...order.store };
  // an older order has only the place of the order
  const name = store.name ?? order.order_location?.name;
  const address = [store.address, store.landmark].filter(Boolean).join(' · ') || order.order_location?.location_name;
  const hours = store.schedule ? todayHours({ schedule: store.schedule }) : null;
  const hasCoordinates = store.latitude != null && store.longitude != null;

  if (!name) return null;

  return (
    <section className='border-border grid gap-4 rounded-xl border bg-white p-6'>
      <h2 className='text-[17px] leading-6 font-bold'>{t('Pickup point')}</h2>
      <div className='grid gap-2.5 text-sm leading-5'>
        <div className='flex items-center gap-2'>
          <StoreIcon className='text-primary size-[18px] shrink-0' />
          <strong className='font-bold'>{name}</strong>
        </div>
        {address && (
          <div className='text-muted-foreground flex items-start gap-2'>
            <MapPinIcon className='mt-0.5 size-4 shrink-0' />
            {address}
          </div>
        )}
        {store.phone && (
          <a
            className='text-primary flex items-center gap-2'
            href={`tel:${store.phone.replace(/\s/g, '')}`}
          >
            <PhoneIcon className='size-4 shrink-0' />
            {store.phone}
          </a>
        )}
        {store.schedule && (
          <div className='text-muted-foreground flex items-center gap-2'>
            <ClockIcon className='size-4 shrink-0' />
            {hours ? `${t('Today')}: ${hours}` : t('Day off today')}
          </div>
        )}
        {hasCoordinates && (
          <a
            className='text-primary flex items-center gap-2'
            href={storeMapUrl({ latitude: store.latitude!, longitude: store.longitude! })}
            rel='noopener noreferrer'
            target='_blank'
          >
            <ExternalLinkIcon className='size-4 shrink-0' />
            {t('View on map')}
          </a>
        )}
      </div>
      <div className='bg-muted flex items-start gap-2.5 rounded-lg p-3 text-[13px] leading-[18px] text-[#4A5563]'>
        <InfoIcon className='mt-0.5 size-4 shrink-0' />
        {t('Pickup kept 2 days')}
      </div>
    </section>
  );
};
