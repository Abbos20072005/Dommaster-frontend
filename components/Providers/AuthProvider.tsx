'use client';

import type { PropsWithChildren } from 'react';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getMe } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { setUser, accessToken } = useAuth();

  React.useEffect(() => {
    if (!accessToken) setUser(null);
  }, []);

  useQuery({
    queryKey: ['me'],
    enabled: !!accessToken,
    queryFn: async () => {
      const res = await getMe();
      if (res.data.ok) setUser(res.data.result);
      else setUser(null);
      return res;
    }
  });

  return children;
};
