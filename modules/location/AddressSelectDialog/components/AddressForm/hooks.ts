import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { patchCustomerAddress, postCustomerAddress } from '@/utils/api/requests';
import { MAP } from '@/utils/constants';

import type { AddressSchema } from './constants';

import { addressSchema } from './constants';

interface Props {
  defaultValues?: Address;
  onSuccess?: (data: Address) => void;
}

export const useAddressForm = ({ defaultValues, onSuccess }: Props) => {
  const isEdit = !!defaultValues;
  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      address: defaultValues
        ? {
            location_name: defaultValues.location_name,
            latitude: defaultValues.latitude,
            longitude: defaultValues.longitude
          }
        : {
            location_name: '',
            longitude: MAP.center[0],
            latitude: MAP.center[1]
          }
    },
    mode: 'onChange'
  });

  const putUserMutation = useMutation({
    mutationFn: patchCustomerAddress,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
      onSuccess?.(data.result);
    }
  });

  const postUserMutation = useMutation({
    mutationFn: postCustomerAddress,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
      onSuccess?.(data.result);
    }
  });

  const queryClient = useQueryClient();

  const onSubmit = (values: AddressSchema) => {
    const data: AddressRequest = {
      name: values.name,
      location_name: values.address.location_name,
      latitude: values.address.latitude,
      longitude: values.address.longitude
    };
    if (isEdit) putUserMutation.mutate({ id: defaultValues.id, data });
    else postUserMutation.mutate({ data });
  };
  return {
    form,
    functions: {
      onSubmit
    },
    state: {
      isPending: putUserMutation.isPending || postUserMutation.isPending
    }
  };
};
