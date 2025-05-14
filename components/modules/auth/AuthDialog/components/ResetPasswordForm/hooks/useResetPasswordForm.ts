import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postResetPassword } from '@/utils/api/requests';

import type { ResetPasswordFormSchema } from '../constants';

import { resetPasswordFormSchema } from '../constants';

interface Props {
  resetToken: string;
  onSuccess?: (data: RegisterResponse) => void;
}

export const useResetPasswordForm = ({ onSuccess, resetToken }: Props) => {
  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      new_password: '',
      confirm_new_password: ''
    }
  });

  const postRegisterMutation = useMutation({
    mutationFn: postResetPassword,
    onSuccess: ({ data }) => onSuccess?.(data)
  });

  const onSubmit = (data: ResetPasswordFormSchema) => {
    postRegisterMutation.mutate({ data: { ...data, reset_token: resetToken } });
  };

  return {
    form,
    state: {
      isPending: postRegisterMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
