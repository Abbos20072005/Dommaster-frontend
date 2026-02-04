'use client';

import type { QueryKey } from '@tanstack/react-query';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';
import { COOKIES } from '@/utils/constants';

import { CartProvider } from './CartSync';
import { FavoritesProvider } from './FavoritesSync';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
    };
  }
}

export const Providers = ({ children }: React.PropsWithChildren) => {
  const t = useTranslations();
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          staleTime: 10 * 60 * 1000 // 10 minutes
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
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <TooltipProvider>
          <CartProvider />
          <FavoritesProvider />
          {children}
        </TooltipProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
