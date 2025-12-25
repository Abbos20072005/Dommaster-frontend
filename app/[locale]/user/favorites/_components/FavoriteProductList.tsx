'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ProductList } from '@/modules/product';
import { useFavorites } from '@/utils/stores';

export const FavoriteProductList = () => {
  const t = useTranslations();
  const { favorites } = useFavorites();

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

  return <ProductList view='grid' products={favorites} />;
};
