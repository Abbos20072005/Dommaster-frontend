import { isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 // 1m
    }
  },
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })
});

const makeQueryClient = () => queryClient;

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
