import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postSendOtp } from '@/utils/api/requests';

import type { LoginFormSchema } from '../constants';

import { loginFormSchema } from '../constants';

interface Props {
  onSuccess?: (data: SendOtpResponse) => void;
}

export const useLoginForm = ({ onSuccess }: Props) => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone_number: '+998'
    }
  });

  const postSendOtpMutation = useMutation({
    mutationFn: postSendOtp,
    onSuccess: ({ data }) => onSuccess?.(data)
  });

  const onSubmit = (data: LoginFormSchema) => {
    postSendOtpMutation.mutate({
      data: {
        phone_number: data.phone_number.replace('+', ''),
        role: 'user'
      }
    });
  };

  return {
    form,
    state: {
      isPending: postSendOtpMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
