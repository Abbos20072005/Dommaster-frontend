import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { handleFormServerErrors } from '@/lib/utils';
import { patchMe } from '@/utils/api/requests';

import type { PersonalInfoFormSchema } from '../constants';

import { personalInfoFormSchema } from '../constants';

interface Props {
  defaultValues?: User;
  disabled?: boolean;
}

export const usePersonalInfoForm = ({ defaultValues, disabled }: Props) => {
  const form = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      full_name: defaultValues?.full_name || '',
      email: defaultValues?.email || '',
      phone_number: defaultValues?.phone_number || ''
    },
    disabled
  });

  const patchPersonalInfoMutation = useMutation({
    mutationFn: patchMe,
    onSuccess: () => {
      toast.success('Personal info updated successfully');
    },
    onError: (error) => {
      handleFormServerErrors(error, form.setError);
    }
  });

  const onSubmit = (data: PersonalInfoFormSchema) => {
    patchPersonalInfoMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: patchPersonalInfoMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
