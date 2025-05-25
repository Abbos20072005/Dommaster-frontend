import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuthStore } from '@/utils/stores';

export const makeQueryClient = (t: (key: string) => string) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0
      }
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            useAuthStore.getState().auth.reset();
          }
        }
      }
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        const errorCode = error?.response?.data?.error_code;
        if (errorCode) {
          toast.error(t(`errorMessages.${errorCode}`));
        } else {
          toast.error(t('errorMessages.default'));
        }
      }
    })
  });
