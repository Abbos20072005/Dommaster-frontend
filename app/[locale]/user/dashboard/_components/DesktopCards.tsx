'use client';

import { EyeIcon, HeartIcon, ShoppingBagIcon, TagIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { useFavorites } from '@/utils/stores';

export const DesktopCards = () => {
  const t = useTranslations();
  const { favorites } = useFavorites();

  return (
    <div className='hidden md:block'>
      <h1 className='mb-3 text-2xl font-bold'>{t('My cabinet')}</h1>
      <div className='grid grid-cols-2 gap-4'>
        <Link href='/user/promo'>
          <Card className='group' variant='outline'>
            <CardHeader>
              <div className='bg-muted group-hover:bg-secondary/10 grid size-12 place-items-center rounded-sm transition-colors'>
                <TagIcon />
              </div>
            </CardHeader>
            <CardContent>
              <p>{t('Promo codes')}</p>
              <p className='text-muted-foreground'>{t('Buy with a profit')}</p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/user/reviews'>
          <Card className='group' variant='outline'>
            <CardHeader>
              <div className='bg-muted group-hover:bg-secondary/10 grid size-12 place-items-center rounded-sm transition-colors'>
                <HeartIcon />
              </div>
            </CardHeader>
            <CardContent>
              <p>{t('Favorites')}</p>
              <p className='text-muted-foreground'>
                {favorites?.length
                  ? t('{count} products', { count: favorites.length })
                  : t('No products')}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/user/orders/history'>
          <Card className='group' variant='outline'>
            <CardHeader>
              <div className='bg-muted group-hover:bg-secondary/10 grid size-12 place-items-center rounded-sm transition-colors'>
                <ShoppingBagIcon />
              </div>
            </CardHeader>
            <CardContent>
              <p>{t('Purchase history')}</p>
              <p className='text-muted-foreground'>{t('Order again')}</p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/user/products-history'>
          <Card className='group' variant='outline'>
            <CardHeader>
              <div className='bg-muted group-hover:bg-secondary/10 grid size-12 place-items-center rounded-sm transition-colors'>
                <EyeIcon />
              </div>
            </CardHeader>
            <CardContent>
              <p>{t('Viewed')}</p>
              <p className='text-muted-foreground'>{t('Easy to find')}</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};
