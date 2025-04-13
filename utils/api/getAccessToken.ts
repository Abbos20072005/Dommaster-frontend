'use server';

import { cookies } from 'next/headers';

import { COOKIES } from '@/utils/constants/cookies';

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIES.ACCESS_TOKEN)?.value;
};
