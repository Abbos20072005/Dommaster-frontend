'use client';

import { YMaps } from '@pbe/react-yandex-maps';
import { QueryClientProvider } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { makeQueryClient } from '@/utils/getQueryClient';

import { AuthProvider } from './AuthProvider';
import { FavoritesProvider } from './FavoritesProvider';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const t = useTranslations();
  const queryClient = makeQueryClient(t);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
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
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
