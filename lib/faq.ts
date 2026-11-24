import { unstable_cache } from 'next/cache';

import { toLanguage } from '@/lib/catalogTree';
import { getFaq } from '@/utils/api/requests';

/**
 * The FAQ of a page (or all of it) kept for five minutes per language: the API itself keeps the
 * answer for 15 minutes and drops it on every change in the admin, so the site must not keep it
 * longer. The language goes in as a header, so nothing in here reads the request. A failed
 * request is not kept.
 */
const getCachedFaq = unstable_cache(
  async (language: 'ru' | 'uz', page: FaqPageKey | undefined) =>
    (await getFaq({ page, config: { headers: { 'Accept-Language': language } } })).data.result,
  ['faq'],
  { revalidate: 300 }
);

/** The topics with their questions; `null` when the API does not answer (the page keeps its own texts). */
export const loadFaq = (locale: string, page?: FaqPageKey): Promise<FaqTopic[] | null> =>
  getCachedFaq(toLanguage(locale), page).catch(() => null);

/**
 * The links inside an answer that lead to the site (`/returns`) get the language of the page:
 * in a plain `<a>` the Uzbek visitor would land on the Russian page.
 */
export const localizeFaqHtml = (html: string, locale: string): string =>
  locale === 'ru'
    ? html
    : html.replace(
        /href=(["'])\/(?!\/|uz\/|uz\1)/g,
        (_, quote: string) => `href=${quote}/${locale}/`
      );
