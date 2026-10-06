import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

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

import { VideosList } from './_components/VideosList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Videos') };
}

const VideosPage = async () => {
  const t = await getTranslations();

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
              <BreadcrumbPage>{t('Videos')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl'>{t('Videos')}</h1>
        <VideosList />
        <RecentlyViewedProducts />
      </BaseLayout>
    </div>
  );
};

export default VideosPage;
