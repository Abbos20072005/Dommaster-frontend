'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import { getQueryClient } from '@/utils/getQueryClient';

import { AuthProvider } from './AuthProvider';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};
