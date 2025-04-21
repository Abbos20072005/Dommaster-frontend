'use client';

import { YMaps } from '@pbe/react-yandex-maps';
import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { getQueryClient } from '@/utils/getQueryClient';

import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { FavoritesProvider } from './FavoritesProvider';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <CartProvider>
          <FavoritesProvider>
            <AuthProvider>
              <YMaps
                query={{
                  apikey: process.env.YANDEX_KEY,
                  suggest_apikey: process.env.SUGGEST_KEY
                }}
              >
                <TooltipProvider>{children}</TooltipProvider>
              </YMaps>
            </AuthProvider>
          </FavoritesProvider>
        </CartProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
