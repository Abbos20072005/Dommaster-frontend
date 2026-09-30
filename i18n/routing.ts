import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Sayt ikki tilda ishlaydi: rus (asosiy) va o'zbek
  // ESKI KOD: locales: ['en', 'ru', 'uz'],
  locales: ['ru', 'uz'],

  // Used when no locale matches
  defaultLocale: 'ru',

  // The prefix for the default locale
  localePrefix: 'never',

  // Tanlangan til cookie'da 1 yil saqlanadi (standart holatda brauzer yopilganda o'chib ketadi)
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365
  }
});

export type Locale = (typeof routing.locales)[number];

// Navbar'dagi til tanlagichda ko'rinadigan nomlar
export const LOCALE_LABELS: Record<Locale, { short: string; full: string }> = {
  ru: { short: 'Ру', full: 'Русский' },
  uz: { short: 'Oʻz', full: 'Oʻzbekcha' }
};