'use client';

import { useAuth } from '@/modules/auth';

/** PRO = the old "prorab" (the staff give it; `GET /auth/auth/me/` → `role`). */
export const useIsPro = () => {
  const { user, isPending } = useAuth();
  return { isPro: user?.role === 'prorab', isLoading: isPending && !user };
};
