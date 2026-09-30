import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Ensure that a valid locale is used
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Tanlangan tilning tarjimalari yuklanadi
    // ESKI KOD: messages: (await import(`./locales/ru.json`)).default
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
