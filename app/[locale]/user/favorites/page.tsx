import type { Metadata } from 'next';

import { ArrowLeftIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { ProductListSkeleton } from '@/modules/product';

import { FavoriteProductList } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Favorites') };
}

const FavoritesPage = () => {
  const t = useTranslations();

  return (
    <div>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/dashboard'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Favorites')}</h1>
        <Button className='size-13' size='icon' variant='ghost'>
          <TrashIcon className='text-muted-foreground size-5' />
        </Button>
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('Favorites')}</h1>
        <Suspense fallback={<ProductListSkeleton view='grid' count={3} />}>
          <FavoriteProductList />
        </Suspense>
      </Card>
    </div>
  );
};

export default FavoritesPage;
