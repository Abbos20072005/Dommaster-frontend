import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ru', 'uz'],

  // Used when no locale matches
  defaultLocale: 'ru',

  // The prefix for the default locale
  localePrefix: 'never'
});

export type Locale = (typeof routing.locales)[number];
