import Cookies from 'js-cookie';

import { COOKIES } from '@/utils/constants/cookies';

/**
 * Gets the access token from cookies on the client side
 */
export const getClientToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return Cookies.get(COOKIES.ACCESS_TOKEN) || null;
};
