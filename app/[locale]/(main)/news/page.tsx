import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { RecentlyViewedProducts } from '@/modules/product';

import { NewsList } from './_components/NewsList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('News'), description: t('metadata.pages.news') };
}

const NewsPage = () => {
  const t = useTranslations();

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
        <NewsList />
        <RecentlyViewedProducts />
      </BaseLayout>
    </div>
  );
};

export default NewsPage;
