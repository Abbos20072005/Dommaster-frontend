'use server';

import { cookies } from 'next/headers';

import { COOKIES } from '@/utils/constants/cookies';

/**
 * Gets the access token from cookies on the server side
 */
export const getServerToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIES.ACCESS_TOKEN)?.value;
};
