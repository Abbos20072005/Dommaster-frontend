import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { MobileHeader } from '@/components/layout';
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
      <MobileHeader />
      <div className='grid gap-5 px-4 md:px-0'>
        <h1 className='text-lg font-bold md:text-[32px] md:leading-[38px] md:tracking-tight'>
          {t('Favorites')}
        </h1>
        <Suspense fallback={<ProductListSkeleton view='grid' count={3} />}>
          <FavoriteProductList />
        </Suspense>
      </div>
      <RecentlyViewedProducts className='pt-4' />
    </div>
  );
};

export default FavoritesPage;
