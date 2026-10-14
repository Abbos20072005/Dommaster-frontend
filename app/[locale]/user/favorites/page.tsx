import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';
import { ProductListSkeleton, RecentlyViewedProducts } from '@/modules/product';

import { FavoriteProductList } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Favorites') };
}

const FavoritesPage = () => {
  const t = useTranslations();

  return (
    <div className='space-y-2'>
      <MobilePageHeader title={t('Favorites')} />
      <div className='grid grid-cols-[minmax(0,1fr)] gap-5 px-4 md:px-0'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('Favorites')}
        </h1>
        <Suspense fallback={<ProductListSkeleton view='grid' count={3} />}>
          <FavoriteProductList />
        </Suspense>
      </div>
      <RecentlyViewedProducts className='pt-4' itemClassName='lg:basis-1/5' />
    </div>
  );
};

export default FavoritesPage;
