import Cookies from 'js-cookie';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { COOKIES } from '@/utils/constants';

/**
 * Gets the current locale on the client side:
 * cookie (til tanlagich yozadi) → <html lang> → default locale
 */
export const getClientLocale = (): string => {
  if (typeof window === 'undefined') {
    return routing.defaultLocale;
  }

  const cookieLocale = Cookies.get(COOKIES.LOCALE);
  if (hasLocale(routing.locales, cookieLocale)) return cookieLocale;

  const htmlLocale = document.documentElement.lang;
  if (hasLocale(routing.locales, htmlLocale)) return htmlLocale;

  return routing.defaultLocale;
};
