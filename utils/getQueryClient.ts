import { isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 // 1m
      }
    },
    queryCache: new QueryCache({}),
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
