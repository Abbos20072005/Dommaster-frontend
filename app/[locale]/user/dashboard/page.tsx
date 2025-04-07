import { ChevronRightIcon, EyeIcon, HeartIcon, ShoppingBagIcon, TagIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

const navLinks = [
  { href: '/user/orders/all', label: 'My orders' },
  { href: '/user/orders/history', label: 'Purchase history' },
  { href: '/user/reviews', label: 'My reviews and questions' },
  { href: '/user/promo', label: 'Promo codes' },
  { href: '/user/personal-info', label: 'Personal info' },
  { href: '/cart', label: 'Cart' },
  { href: '/user/favorites', label: 'Favorites' }
];

const PersonalInfoPage = async () => {
  const t = await getTranslations();

  return (
    <Card className='shadow-none md:p-5 md:shadow-sm'>
      <div className='py-4 md:hidden'>
        <div className='px-4'>
          <Link href='/user/personal-info' className='flex items-center py-3'>
            <p className='flex-1 font-bold'>Mahkambek Satimov</p>
            <ChevronRightIcon className='size-5' />
          </Link>
        </div>
        <div className='no-scrollbar flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]'>
          <Link href='/user/favorites'>
            <div className='bg-muted w-[130px] rounded-sm p-3'>
              <HeartIcon className='mb-3' />
              <p className='text-sm font-semibold'>{t('Favorites')}</p>
              <p className='text-muted-foreground text-xs'>
                {t('{count} products', { count: 10 })}
              </p>
            </div>
          </Link>
          <Link href='/cart'>
            <div className='bg-muted w-[130px] rounded-sm p-3'>
              <ShoppingBagIcon className='mb-3' />
              <p className='text-sm font-semibold'>{t('Cart')}</p>
              <p className='text-muted-foreground text-xs'>
                {t('{count} products', { count: 10 })}
              </p>
            </div>
          </Link>
          <Link href='/user/promo'>
            <div className='bg-muted w-[130px] rounded-sm p-3'>
              <TagIcon className='mb-3' />
              <p className='text-sm font-semibold'>{t('Promo codes')}</p>
              <p className='text-muted-foreground text-xs'>{t('Buy with a profit')}</p>
            </div>
          </Link>
          <Link href='/user/promo'>
            <div className='bg-muted w-[130px] rounded-sm p-3'>
              <EyeIcon className='mb-3' />
              <p className='text-sm font-semibold'>{t('Viewed')}</p>
              <p className='text-muted-foreground text-xs'>{t('Easy to find')}</p>
            </div>
          </Link>
        </div>
        <div className='divide-y px-4'>
          {navLinks.map((item) => (
            <Link href={item.href} key={item.href} className='flex items-center py-3'>
              <p className='flex-1'>{t(item.label)}</p>
              <ChevronRightIcon className='size-5' />
            </Link>
          ))}
        </div>
      </div>
      <div className='hidden md:block'>
        <h1 className='mb-3 text-2xl font-bold'>{t('Personal info')}</h1>
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
      </div>
    </Card>
  );
};

export default PersonalInfoPage;
