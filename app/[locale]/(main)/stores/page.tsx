import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { breadcrumbJsonLd, storesJsonLd } from '@/lib/jsonLd';
import { getStores } from '@/utils/api/requests';

import { StoresView } from './_components/StoresView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: { absolute: t('Stores meta title') },
    description: t('Stores meta description')
  };
}

const StoresPage = async () => {
  const t = await getTranslations();
  // the active shops in the order of the API; without them the page still opens
  const stores = (await getStores().catch(() => undefined))?.data.result ?? [];

  return (
    <div>
      <JsonLd
        data={[
          ...storesJsonLd(stores),
          breadcrumbJsonLd([
            { name: t('Home'), path: '/' },
            { name: t('Stores'), path: '/stores' }
          ])
        ]}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('Stores')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{t('Stores')}</h1>
        <p className='text-muted-foreground max-w-3xl text-sm md:text-base'>
          {t('Stores intro')}
        </p>
        {stores.length ? (
          <StoresView stores={stores} />
        ) : (
          <p className='text-muted-foreground py-10 text-center'>{t('No stores available')}</p>
        )}
      </BaseLayout>
    </div>
  );
};

export default StoresPage;
