'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ProductList, ProductListSkeleton } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getFavorites } from '@/utils/api/requests';

export const FavoriteProductList = () => {
  const t = useTranslations();
  const getFavoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavorites()
  });

  const favorites = getFavoritesQuery.data?.data.result || [];

  if (getFavoritesQuery.isLoading) {
    return (
      <div>
        <ProductListSkeleton view='grid' count={3} />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className='mx-auto grid max-w-lg place-items-center space-y-5 py-10 md:py-20'>
        <Image
          alt='heart'
          className='size-20 md:size-25'
          height={100}
          src='/favorites/favorites-empty.svg'
          width={100}
        />
        <h1 className='text-xl font-bold'>{t('favorites.emptyTitle')}</h1>
        <p className='text-center text-sm'>{t('favorites.emptyDescription')}</p>
        <Button asChild variant='secondary'>
          <Link href='/'>{t('Go to home')}</Link>
        </Button>
      </div>
    );
  }

  return <ProductList view='grid' products={favorites.map((item) => item.product)} />;
};
