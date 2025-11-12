'use client';

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
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </FavoritesProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
