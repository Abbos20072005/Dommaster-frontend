import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { patchMe } from '@/utils/api/requests';

import type { SecurityFormSchema } from '../constants';

import { securityFormSchema } from '../constants';

export const useSecurityForm = () => {
  const t = useTranslations();
  const form = useForm<SecurityFormSchema>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: ''
    }
  });

  const queryClient = useQueryClient();

  const patchPersonalInfoMutation = useMutation({
    mutationFn: patchMe,
    onSuccess: () => {
      toast.success(t('Password updated successfully'));
      form.reset();
      queryClient.invalidateQueries();
    }
  });

  const onSubmit = (data: SecurityFormSchema) => {
    patchPersonalInfoMutation.mutate({
      data: { password: data.password }
    });
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
