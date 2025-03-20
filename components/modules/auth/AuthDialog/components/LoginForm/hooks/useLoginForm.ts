import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postLogin } from '@/utils/api/requests';

import type { LoginFormSchema } from '../constants';

import { loginFormSchema } from '../constants';

export const useLoginForm = (withEmail: boolean) => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema(withEmail)),
    defaultValues: {
      phone_number: '+998',
      email: '',
      password: ''
    }
  });

  const postLoginMutation = useMutation({
    mutationFn: postLogin
  });

  const onSubmit = (data: LoginFormSchema) => {
    postLoginMutation.mutate({
      data: {
        phone_number: data.phone_number,
        email: data.email,
        password: data.password
      }
    });
  };

  return {
    form,
    state: {
      pending: {
        login: postLoginMutation.isPending
      }
    },
    functions: {
      onSubmit
    }
  };
};
