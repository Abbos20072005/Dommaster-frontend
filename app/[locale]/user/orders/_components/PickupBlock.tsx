'use client';

import { useQuery } from '@tanstack/react-query';
import {
  CheckCircle2Icon,
  ClockIcon,
  ExternalLinkIcon,
  InfoIcon,
  MapPinIcon,
  PhoneIcon,
  StoreIcon,
  TriangleAlertIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useFormatDate } from '@/hooks';
import { storeMapUrl, todayHours } from '@/lib/stores';
import { getStores } from '@/utils/api/requests';

/**
 * "Pickup" block of the order (BLD-315): the shop, its address, phone, hours and a map link, the
 * "ready for pickup" state with the deadline (the order is kept 2 days) and the reminder.
 * The shop is `pickup_store`: it is saved in the order when it is placed. An order placed before
 * that has only `pickup_branch` (the shop as it is now, in the old shape of the branches).
 */
export const PickupBlock = ({ order }: { order: Order }) => {
  const t = useTranslations();
  const formatDate = useFormatDate();

  const storesQuery = useQuery({
    queryKey: ['stores'],
    queryFn: () => getStores()
  });

  const snapshot = order.pickup_store;
  const branch = order.pickup_branch;
  const name = snapshot?.name ?? branch?.name ?? order.order_location?.name;
  const address = snapshot
    ? [snapshot.address, snapshot.landmark].filter(Boolean).join(' · ')
    : (branch?.address ?? branch?.location_name ?? order.order_location?.location_name);
  const phone = snapshot ? snapshot.phone : branch?.phone_number;
  const latitude = snapshot?.latitude ?? branch?.latitude;
  const longitude = snapshot?.longitude ?? branch?.longitude;

  // the hours of today come from the list of the shops (the same ids as the branches)
  const live = storesQuery.data?.data.result.find(
    (store) => store.id === (snapshot?.id ?? branch?.id)
  );
  const hours = live ? todayHours(live) : null;

  const isReady = order.status === 5;
  const deadline = order.pickup_deadline
    ? formatDate(order.pickup_deadline, 'dd MMMM, HH:mm')
    : null;

  if (!name) return null;

  return (
    <section className='border-border grid gap-4 rounded-xl border bg-white p-6'>
      <h2 className='text-[17px] leading-6 font-bold'>{t('Pickup point')}</h2>

      {isReady && !order.pickup_expired && (
        <div className='flex items-start gap-2.5 rounded-lg bg-[#E6F6EC] p-3 text-sm leading-5 text-[#12703C]'>
          <CheckCircle2Icon className='mt-0.5 size-[18px] shrink-0' />
          <span>
            <strong className='block'>{t('Order ready for pickup')}</strong>
            {deadline && t('Pick up by', { date: deadline })}
          </span>
        </div>
      )}
      {isReady && order.pickup_expired && (
        <div className='flex items-start gap-2.5 rounded-lg bg-[#FDECEC] p-3 text-sm leading-5 text-[#B42318]'>
          <TriangleAlertIcon className='mt-0.5 size-[18px] shrink-0' />
          <span>
            <strong className='block'>{t('Pickup time is over')}</strong>
            {t('Pickup time is over text')}
          </span>
        </div>
      )}

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
        {phone && (
          <a className='text-primary flex items-center gap-2' href={`tel:${phone.replace(/\s/g, '')}`}>
            <PhoneIcon className='size-4 shrink-0' />
            {phone}
          </a>
        )}
        {live && (
          <div className='text-muted-foreground flex items-center gap-2'>
            <ClockIcon className='size-4 shrink-0' />
            {hours ? `${t('Today')}: ${hours}` : t('Day off today')}
          </div>
        )}
        {latitude != null && longitude != null && (
          <a
            className='text-primary flex items-center gap-2'
            href={storeMapUrl({ latitude, longitude })}
            rel='noopener noreferrer'
            target='_blank'
          >
            <ExternalLinkIcon className='size-4 shrink-0' />
            {t('View on map')}
          </a>
        )}
      </div>

      {!isReady && (
        <div className='bg-muted flex items-start gap-2.5 rounded-lg p-3 text-[13px] leading-[18px] text-[#4A5563]'>
          <InfoIcon className='mt-0.5 size-4 shrink-0' />
          {t('Pickup kept 2 days')}
        </div>
      )}
    </section>
  );
};
