import { ArrowLeftIcon, TrashIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ProductList } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { productsData } from '@/fake-data/products';
import { Link } from '@/i18n/navigation';

const FavoritesPage = async () => {
  const t = await getTranslations();

  return (
    <div>
      <div className='mb-4 flex items-center border-b lg:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/profile'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold lg:hidden'>{t('Favorites')}</h1>
        <Button className='size-13' size='icon' variant='ghost'>
          <TrashIcon className='text-muted-foreground size-5' />
        </Button>
      </div>
      <Card className='px-4 shadow-none lg:p-5 lg:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold lg:block'>{t('Favorites')}</h1>
        <ProductList
          view='grid'
          products={productsData.filter((product) => product.isInFavorites)}
        />
      </Card>
    </div>
  );
};

export default FavoritesPage;
