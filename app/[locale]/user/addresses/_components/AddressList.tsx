'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
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

  if (getAddressesQuery.isFetching) {
    return (
      <div className='flex h-full w-full items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (addresses?.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 py-20'>
        <AddressSelectDialog asChild>
          <Button variant='secondary'>
            <PlusIcon />
            {t('Add address')}
          </Button>
        </AddressSelectDialog>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3'>
        {addresses?.map((address) => <AddressItem key={address.id} address={address} />)}
      </div>
      <AddressSelectDialog asChild>
        <Button variant='secondary'>
          <PlusIcon />
          Add address
        </Button>
      </AddressSelectDialog>
    </div>
  );
};
