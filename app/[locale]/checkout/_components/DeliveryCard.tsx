'use client';

import { useQuery } from '@tanstack/react-query';
import { TruckIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPhoneNumber } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { getCustomerAddresses } from '@/utils/api/requests';

import { SelectAddressDialog } from './SelectAddressDialog';

export const DeliveryCard = () => {
  const t = useTranslations();
  const { user, isPending } = useAuth();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;
  const defaultAddress = addresses?.find((address) => address.is_default);

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
          {getAddressesQuery.isFetching ? (
            <CardHeader className='flex-1'>
              <CardTitle className='font-semibold'>
                <Skeleton className='h-4 w-20' />
              </CardTitle>

              <CardDescription>
                <Skeleton className='h-5 w-3/4' />
              </CardDescription>
              <SelectAddressDialog asChild>
                <Skeleton className='h-11 w-full' />
              </SelectAddressDialog>
            </CardHeader>
          ) : (
            <CardHeader className='flex-1'>
              <CardTitle className='font-semibold'>
                {defaultAddress?.name || t('Delivery address not specified')}
              </CardTitle>
              <CardDescription>{defaultAddress?.location_name}</CardDescription>
              <SelectAddressDialog asChild>
                <Button variant='muted'>
                  {defaultAddress ? t('Choose another') : t('Select')}
                </Button>
              </SelectAddressDialog>
            </CardHeader>
          )}
        </Card>
        <Card className='flex items-start gap-3 p-4' variant='outline'>
          <div className='bg-muted rounded-md p-2'>
            <UserIcon className='text-secondary' />
          </div>
          <div className='flex-1 space-y-2'>
            <CardTitle className='font-semibold'>{t('Recipient')}</CardTitle>
            {user ? (
              <div className='flex flex-wrap space-x-2 text-sm'>
                <span>{user.full_name}</span>
                <span className='text-muted-foreground'>
                  {formatPhoneNumber(user.phone_number)}
                </span>
              </div>
            ) : (
              isPending && (
                <div className='flex flex-wrap items-center gap-2'>
                  <Skeleton className='h-5 w-20' />
                  <Skeleton className='h-5 w-24' />
                </div>
              )
            )}
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};
