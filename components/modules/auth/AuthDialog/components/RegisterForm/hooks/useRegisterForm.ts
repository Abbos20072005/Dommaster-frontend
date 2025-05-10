import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postRegister } from '@/utils/api/requests';

import type { RegisterFormSchema } from '../constants';

import { registerFormSchema } from '../constants';

export const useRegisterForm = (onSuccess?: (data: RegisterResponse) => void) => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      full_name: '',
      phone_number: '+998',
      email: '',
      password: '',
      confirm_password: ''
    }
  });

  const postRegisterMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: ({ data }) => onSuccess?.(data)
  });

  const onSubmit = ({ confirm_password, ...data }: RegisterFormSchema) => {
    postRegisterMutation.mutate({ data });
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
