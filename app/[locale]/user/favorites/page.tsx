import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { MobileHeader } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { ProductListSkeleton } from '@/modules/product';

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
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-4 text-lg font-bold md:text-2xl'>{t('Favorites')}</h1>
        <Suspense fallback={<ProductListSkeleton view='grid' count={3} />}>
          <FavoriteProductList />
        </Suspense>
      </Card>
    </div>
  );
};

export default FavoritesPage;
