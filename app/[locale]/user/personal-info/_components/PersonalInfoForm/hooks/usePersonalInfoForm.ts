import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { handleFormServerErrors } from '@/lib/utils';
import { useAuthed } from '@/modules/auth';
import { patchMe } from '@/utils/api/requests';

import type { PersonalInfoFormSchema } from '../constants';

import { personalInfoFormSchema } from '../constants';

export const usePersonalInfoForm = () => {
  const { user } = useAuthed();
  const form = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      full_name: user.full_name || '',
      email: user.email || '',
      phone_number: user.phone_number || ''
    }
  });

  const queryClient = useQueryClient();

  const patchPersonalInfoMutation = useMutation({
    mutationFn: patchMe,
    onSuccess: ({ data }) => {
      toast.success('Personal info updated successfully');
      form.reset(data.result);
      queryClient.invalidateQueries();
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
