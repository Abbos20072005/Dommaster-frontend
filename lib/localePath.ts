import { routing } from '@/i18n/routing';

/**
 * The language of an address and the address without it: the Russian site is at the root,
 * the Uzbek one under `/uz` (`localePrefix: 'as-needed'`). Plain strings, so it works in the
 * proxy (middleware), the sitemaps and the pages.
 */
export const splitLocale = (pathname: string): { locale: 'ru' | 'uz'; path: string } => {
  const match = /^\/(ru|uz)(?=\/|$)/.exec(pathname);
  if (!match) return { locale: routing.defaultLocale, path: pathname || '/' };
  return { locale: match[1] as 'ru' | 'uz', path: pathname.slice(match[0].length) || '/' };
};

/** `/catalog` + uz → `/uz/catalog`; `/` + uz → `/uz`; Russian paths stay as they are. */
export const withLocale = (path: string, locale: string): string => {
  if (locale !== 'uz') return path;
  return path === '/' ? '/uz' : `/uz${path}`;
};
