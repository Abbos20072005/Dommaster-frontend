'use client';

import type { QueryKey } from '@tanstack/react-query';

import { QueryClientProvider } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { LoginProvider } from '@/components/Providers/LoginProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getQueryClient } from '@/utils/get-query-client';

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
  const queryClient = getQueryClient(t);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <TooltipProvider>
          <LoginProvider>
            <CartProvider />
            <FavoritesProvider />
            {children}
          </LoginProvider>
        </TooltipProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
