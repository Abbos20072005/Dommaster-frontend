import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useRouter } from '@/i18n/navigation';
import { patchForgotPassword } from '@/utils/api/requests';

import type { ForgotPasswordFormSchema } from '../constants';

import { forgotPasswordFormSchema } from '../constants';

interface Props {
  onSuccess?: (data: ForgotPasswordResponse) => void;
}

export const useForgotPasswordForm = ({ onSuccess }: Props) => {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      phone_number: '+998'
    }
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const patchForgotPasswordMutation = useMutation({
    mutationFn: patchForgotPassword,
    onSuccess: ({ data }) => {
      onSuccess?.(data);
      queryClient.invalidateQueries();
      router.refresh();
    }
  });

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    patchForgotPasswordMutation.mutate({
      data: {
        phone_number: data.phone_number
      }
    });
  };

  return {
    form,
    state: {
      isPending: patchForgotPasswordMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
