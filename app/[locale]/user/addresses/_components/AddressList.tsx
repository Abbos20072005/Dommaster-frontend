'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPinIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AddressSelectDialog } from '@/modules/location';
import { getCustomerAddresses } from '@/utils/api/requests';

import { AddressItem } from './AddressItem';

export const AddressList = () => {
  const t = useTranslations();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;

  if (getAddressesQuery.isLoading) {
    return (
      <div className='grid gap-4 md:grid-cols-2' aria-busy='true'>
        {[0, 1].map((index) => (
          <Skeleton key={index} className='h-32 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!addresses?.length) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='bg-primary/10 text-primary mb-2 flex size-14 items-center justify-center rounded-full'>
          <MapPinIcon className='size-6' />
        </span>
        <h2 className='text-xl leading-[26px] font-bold'>{t('No saved addresses')}</h2>
        <p className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>
          {t('Add a delivery address to place orders faster')}
        </p>
        <AddressSelectDialog asChild>
          <Button className='mt-3 h-11 px-5'>
            <PlusIcon />
            {t('Add address')}
          </Button>
        </AddressSelectDialog>
      </div>
    );
  }

  return (
    <div className='grid gap-5'>
      <div className='flex items-center justify-between gap-4'>
        <span className='text-[15px] leading-[22px] text-[#4A5563]'>
          {t('{count} addresses', { count: addresses.length })}
        </span>
        <AddressSelectDialog asChild>
          <Button className='h-11 px-5'>
            <PlusIcon />
            {t('Add address')}
          </Button>
        </AddressSelectDialog>
      </div>
      <div className='grid items-start gap-4 md:grid-cols-2'>
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            nextDefaultName={addresses.find((item) => item.id !== address.id)?.name}
          />
        ))}
      </div>
    </div>
  );
};
