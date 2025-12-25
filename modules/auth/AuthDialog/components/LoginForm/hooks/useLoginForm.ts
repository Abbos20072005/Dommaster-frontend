import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import { useRouter } from '@/i18n/navigation';
import { postLogin } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';

import type { LoginFormSchema } from '../constants';

import { loginFormSchema } from '../constants';

interface Props {
  withEmail: boolean;
  onSuccess?: (data: LoginResponse) => void;
}

export const useLoginForm = ({ onSuccess, withEmail }: Props) => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema(withEmail)),
    defaultValues: {
      phone_number: '+998',
      email: '',
      password: ''
    }
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      Cookies.set(COOKIES.ACCESS_TOKEN, data.access_token);
      Cookies.set(COOKIES.REFRESH_TOKEN, data.refresh_token);
      onSuccess?.(data);
      queryClient.invalidateQueries();
      router.refresh();
    }
  });

  const onSubmit = (data: LoginFormSchema) => {
    postLoginMutation.mutate({
      data: {
        phone_number: withEmail ? undefined : data.phone_number,
        email: withEmail ? data.email : undefined,
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
