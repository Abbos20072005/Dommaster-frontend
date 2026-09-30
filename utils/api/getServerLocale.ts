'use server';

import { hasLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

import { routing } from '@/i18n/routing';
import { COOKIES } from '@/utils/constants';

export const getServerLocale = async () => {
  // next-intl middleware aniqlagan til (cookie yoki brauzer tili bo'yicha)
  try {
    const locale = await getLocale();
    if (hasLocale(routing.locales, locale)) return locale;
  } catch {
    // So'rov kontekstidan tashqarida chaqirilsa — cookie'ga qaytamiz
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIES.LOCALE)?.value;
  return hasLocale(routing.locales, cookieLocale) ? cookieLocale : routing.defaultLocale;
};
