import Cookies from 'js-cookie';

import { routing } from '@/i18n/routing';
import { COOKIES } from '@/utils/constants';

/**
 * Gets the current locale from cookies on the client side
 * Falls back to the default locale if not found
 */
export const getClientLocale = (): string => {
  if (typeof window === 'undefined') {
    return routing.defaultLocale;
  }
  
  return Cookies.get(COOKIES.LOCALE) || routing.defaultLocale;
};

