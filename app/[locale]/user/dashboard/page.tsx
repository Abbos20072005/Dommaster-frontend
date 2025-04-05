import { EyeIcon, HeartIcon, ShoppingBagIcon, TagIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

const PersonalInfoPage = async () => {
  const t = await getTranslations();

  return (
    <Card className='shadow-none lg:p-5 lg:shadow-sm'>
      <h1 className='mb-3 hidden text-2xl font-bold lg:block'>{t('Personal info')}</h1>
      <div className='grid gap-4 md:grid-cols-2'>
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
              <p className='text-muted-foreground'>{t('{count} products', { count: 3 })}</p>
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
    </Card>
  );
};

export default PersonalInfoPage;
