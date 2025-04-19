'use client';

import { useQuery } from '@tanstack/react-query';
import { TruckIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPhoneNumber } from '@/lib/utils';
import { getCustomerAddresses } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

import { SelectAddressDialog } from './SelectAddressDialog';

export const DeliveryCard = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;
  const [selectedAddressId] = useQueryState('delivery_address', { defaultValue: '' });

  const address = addresses?.find(
    (address) => selectedAddressId && address.id === +selectedAddressId
  );

  return (
    <Card variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Delivery address')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Card className='flex items-start' variant='outline'>
          <div className='p-4 pr-0'>
            <div className='bg-muted rounded-md p-2'>
              <TruckIcon className='text-secondary' />
            </div>
          </div>
          <CardHeader className='flex-1'>
            <CardTitle className='font-semibold'>
              {address?.name || t('Delivery address not specified')}
            </CardTitle>
            <CardDescription>{address?.location_name}</CardDescription>
            <SelectAddressDialog asChild>
              <Button variant='muted'>{address ? t('Choose another') : t('Select')}</Button>
            </SelectAddressDialog>
          </CardHeader>
        </Card>
        <Card className='flex items-start gap-3 p-4' variant='outline'>
          <div className='bg-muted rounded-md p-2'>
            <UserIcon className='text-secondary' />
          </div>
          <div className='flex-1 space-y-2'>
            <CardTitle className='font-semibold'>Получатель</CardTitle>
            {user ? (
              <div className='flex flex-wrap space-x-2 text-sm'>
                <span>{user?.full_name}</span>
                <span className='text-muted-foreground'>
                  {formatPhoneNumber(user?.phone_number)}
                </span>
              </div>
            ) : (
              <div className='flex flex-wrap items-center gap-2'>
                <Skeleton className='h-5 w-20' />
                <Skeleton className='h-5 w-24' />
              </div>
            )}
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};
