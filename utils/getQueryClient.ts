import { isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useAuthStore } from '@/utils/stores';

const makeQueryClient = () =>
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
        if (typeof error.response.data.detail === 'string') {
          toast.error(error.response.data.detail);
        } else if (typeof error.response.data.details === 'object') {
          const errors = Object.values(error.response.data.details).flat();
          toast.error(errors[0] as string);
        } else {
          toast.error('An error occurred');
        }
      }
    })
  });

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
