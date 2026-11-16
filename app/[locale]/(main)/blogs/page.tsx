import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { toLanguage } from '@/lib/catalogTree';
import { RecentlyViewedProducts } from '@/modules/product';
import { getNewsList } from '@/utils/api/requests';

import { NewsList } from './_components/NewsList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('News'), description: t('metadata.pages.news') };
}

/** the same request as the list makes in the browser: the first (big) page of the news */
const getCachedNews = unstable_cache(
  async (language: 'ru' | 'uz') => {
    const response = await getNewsList({
      config: { params: { page: 1, page_size: 100 }, headers: { 'Accept-Language': language } }
    });
    return response.data;
  },
  ['news-list'],
  { revalidate: 300 }
);

const NewsPage = async () => {
  const t = await getTranslations();
  // the articles are in the HTML with their links (BLD-426): without them the search engines
  // found the articles only through the sitemap. A failed request leaves the list to the browser.
  const initial = await getCachedNews(toLanguage(await getLocale())).catch(() => null);

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-6 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('News')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl'>{t('News')}</h1>
        <NewsList initial={initial} />
        <RecentlyViewedProducts />
      </BaseLayout>
    </div>
  );
};

export default NewsPage;
