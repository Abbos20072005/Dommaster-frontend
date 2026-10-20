import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';

import { withCurrentCompany, withMainPhone } from '@/lib/phone';
import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getAbout } from '@/utils/api/requests';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('About company'), description: t('metadata.pages.about') };
}

const ArticlesPage = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const aboutResponse = await getAbout();
  const about = aboutResponse.data.result.description;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 max-w-4xl space-y-6 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('About company')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='sr-only'>{t('About company')}</h1>
        <div
          className='prose prose-sm md:prose-base max-w-max'
          dangerouslySetInnerHTML={{ __html: withCurrentCompany(withMainPhone(about), locale) }}
        />
      </BaseLayout>
    </div>
  );
};

export default ArticlesPage;
