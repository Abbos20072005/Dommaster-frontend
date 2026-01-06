import { isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { COOKIES } from '@/utils/constants';

function makeQueryClient(t: (str: string) => string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0
      }
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        if (error instanceof AxiosError && error.status === 401) {
          Cookies.remove(COOKIES.ACCESS_TOKEN);
          Cookies.remove(COOKIES.REFRESH_TOKEN);
        }
      }
    }),
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidatesQuery
          });
        }
      },
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
  return queryClient;
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(t: (str: string) => string) {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(t);
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(t);
    return browserQueryClient;
  }
}
