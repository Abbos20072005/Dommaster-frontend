import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useLocationName } from '@/components/modules/location/useLocationName';
import { patchCustomerAddress, postCustomerAddress } from '@/utils/api/requests';

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
      coordinates: defaultValues && [defaultValues.latitude, defaultValues.longitude]
    }
  });
  const coordinates = form.watch('coordinates');

  const locationName = useLocationName(coordinates);

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
      location_name: locationName!,
      latitude: coordinates[0],
      longitude: coordinates[1]
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
      isPending: putUserMutation.isPending || postUserMutation.isPending,
      locationName
    }
  };
};
