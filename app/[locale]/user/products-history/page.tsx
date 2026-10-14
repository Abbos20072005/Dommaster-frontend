import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';

import { ViewedProducts } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Viewed products') };
}

const ProductsHistoryPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <MobilePageHeader title={t('Viewed products')} />
      <AuthWrapper>
        <div className='grid grid-cols-[minmax(0,1fr)] gap-5 px-4 md:px-0'>
          <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
            {t('Viewed products')}
          </h1>
          <ViewedProducts />
        </div>
      </AuthWrapper>
    </>
  );
};

export default ProductsHistoryPage;
