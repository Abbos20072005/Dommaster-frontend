import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Sayt ikki tilda ishlaydi: rus (asosiy) va o'zbek
  // ESKI KOD: locales: ['en', 'ru', 'uz'],
  locales: ['ru', 'uz'],

  // Used when no locale matches
  defaultLocale: 'ru',

  // The Russian site is at the root, the Uzbek one under `/uz/...` (BLD: UZ for Google): the
  // language is in the address, so a crawler without a cookie gets the Uzbek page at its own URL
  // ESKI KOD: localePrefix: 'never' (til faqat cookie'da edi)
  localePrefix: 'as-needed',

  // The language of a page is the one of its address and nothing else (BLD-488): with detection
  // on, a request of the Russian address with a `NEXT_LOCALE=uz` cookie (a crawler keeps the
  // cookie it got on a `/uz/...` page) or `Accept-Language: uz` was redirected (307) to `/uz/...`,
  // so a crawl recorded the Uzbek title and canonical for a Russian URL.
  localeDetection: false,

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