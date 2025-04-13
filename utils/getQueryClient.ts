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
        toast.error(error.response.data.detail || 'Что-то пошло не так');
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
