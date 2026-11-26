'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getCustomerAddresses } from '@/utils/api/requests';

import { SelectAddressDialog } from './SelectAddressDialog';

// Yetkazib berish manzili — "Способ доставки" kartasi ichida ko'rsatiladigan ixcham blok
export const DeliveryAddress = () => {
  const t = useTranslations();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const defaultAddress = getAddressesQuery.data?.data.result.find((address) => address.is_default);
  // the courier details under the street (the same ones the courier gets with the order)
  const details = defaultAddress
    ? [
        ['Apartment / office', defaultAddress.apartment],
        ['Entrance', defaultAddress.entrance],
        ['Floor', defaultAddress.floor],
        ['Intercom', defaultAddress.intercom]
      ]
        .filter(([, value]) => value?.trim())
        .map(([label, value]) => `${t(label as string)} ${value!.trim()}`)
        .join(', ')
    : '';

  return (
    <div className='bg-background flex items-center gap-3 rounded-xl p-3'>
      <div className='bg-muted shrink-0 rounded-md p-2'>
        <MapPinIcon className='text-primary size-5' />
      </div>
      <div className='min-w-0 flex-1'>
        {getAddressesQuery.isFetching ? (
          <div className='space-y-1.5'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3.5 w-3/4' />
          </div>
        ) : defaultAddress ? (
          <>
            {/* one address: the street of the map marker, the one the price and the courier use (BLD-553) */}
            <p className='line-clamp-2 text-sm font-semibold'>{defaultAddress.location_name}</p>
            {details && <p className='text-muted-foreground line-clamp-2 text-xs'>{details}</p>}
          </>
        ) : (
          <p className='text-muted-foreground text-sm'>{t('Delivery address not specified')}</p>
        )}
      </div>
      <SelectAddressDialog asChild>
        <Button className='shrink-0' size='sm' variant='primaryFlat'>
          {defaultAddress ? t('Change') : t('Select')}
        </Button>
      </SelectAddressDialog>
    </div>
  );
};
