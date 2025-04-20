'use server';

import { cookies } from 'next/headers';

import { COOKIES } from '@/utils/constants';

export const getServerLocale = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIES.LOCALE)?.value;
};
