'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { AddressSelectDialog } from '@/modules/location';
import { getCustomerAddresses, patchCustomerAddress } from '@/utils/api/requests';

import { AddressItem } from './AddressItem';

interface Props {
  onSave?: () => void;
}

export const AddressList = ({ onSave }: Props) => {
  const t = useTranslations();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;

  const [currentAddressId, setCurrentAddressId] = React.useState<number | undefined>(
    addresses?.find((item) => item.is_default)?.id
  );

  const queryClient = useQueryClient();
  const patchAddressMutation = useMutation({
    mutationFn: patchCustomerAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
      onSave?.();
    }
  });

  const onSubmit = () => {
    if (!currentAddressId) return;
    patchAddressMutation.mutate({ id: currentAddressId, data: { is_default: true } });
  };

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
      <div className='space-y-3'>
        <RadioGroup
          value={String(currentAddressId ?? '')}
          onValueChange={(value) => setCurrentAddressId(+value)}
        >
          {addresses?.map((address) => (
            <div key={address.id} className='flex gap-2'>
              <RadioGroupItem
                className='mt-2 size-5'
                id={String(address.id)}
                value={String(address.id)}
              />
              <Label className='flex-1' htmlFor={String(address.id)}>
                <AddressItem address={address} />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <AddressSelectDialog asChild>
        <Button variant='ghost'>
          <PlusIcon />
          {t('Add address')}
        </Button>
      </AddressSelectDialog>
      <div className='flex justify-end' onClick={onSubmit}>
        <Button disabled={!currentAddressId} isLoading={patchAddressMutation.isPending}>
          {t('Save')}
        </Button>
      </div>
    </div>
  );
};
