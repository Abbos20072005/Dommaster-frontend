'use client';

import { ChevronRightIcon, EyeIcon, HeartIcon, ShoppingBagIcon, TagIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AuthDialog } from '@/components/modules/auth';
import { useCart } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { useAuth, useFavorites } from '@/utils/stores';

const navLinks = [
  { href: '/user/orders/all', label: 'My orders', authorized: true },
  { href: '/user/orders/history', label: 'Purchase history', authorized: true },
  { href: '/user/reviews', label: 'My reviews and questions', authorized: true },
  { href: '/user/promo', label: 'Promo codes', authorized: true },
  { href: '/user/personal-info', label: 'Personal info', authorized: true },
  { href: '/cart', label: 'Cart', authorized: false },
  { href: '/user/favorites', label: 'Favorites', authorized: false }
];

export const MobileCards = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { cart } = useCart();
  const { favorites } = useFavorites();

  if (user === undefined) {
    return (
      <div className='flex items-center justify-center py-20 md:hidden'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='py-4 md:hidden'>
      <div className='px-4'>
        {user === null ? (
          <div>
            <p className='mb-3 font-semibold'>{t('Login to manage your account')}</p>
            <div className='grid grid-cols-2 gap-2 py-4'>
              <AuthDialog asChild defaultStep='register'>
                <Button>{t('Register')}</Button>
              </AuthDialog>
              <AuthDialog asChild>
                <Button variant='outline'>{t('Login')}</Button>
              </AuthDialog>
            </div>
          </div>
        ) : (
          <>
            <Link href='/user/personal-info' className='flex items-center py-3'>
              <p className='flex-1 font-bold'>{user?.full_name}</p>
              <ChevronRightIcon className='size-5' />
            </Link>
            <div className='no-scrollbar flex gap-2 overflow-x-auto py-2 [scrollbar-width:none]'>
              <Link href='/user/favorites'>
                <div className='bg-muted w-[130px] rounded-sm p-3'>
                  <HeartIcon className='mb-3' />
                  <p className='text-sm font-semibold'>{t('Favorites')}</p>
                  <p className='text-muted-foreground text-xs'>
                    {favorites?.length
                      ? t('{count} products', { count: favorites?.length })
                      : t('No products')}
                  </p>
                </div>
              </Link>
              <Link href='/cart'>
                <div className='bg-muted w-[130px] rounded-sm p-3'>
                  <ShoppingBagIcon className='mb-3' />
                  <p className='text-sm font-semibold'>{t('Cart')}</p>
                  <p className='text-muted-foreground text-xs'>
                    {cart?.cart_items.length
                      ? t('{count} products', { count: cart?.cart_items.length })
                      : t('No products')}
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
          </>
        )}
      </div>
      <div className='divide-y px-4'>
        {navLinks.map((item) =>
          item.authorized && !user ? null : (
            <Link href={item.href} key={item.href} className='flex items-center py-3'>
              <p className='flex-1'>{t(item.label)}</p>
              <ChevronRightIcon className='size-5' />
            </Link>
          )
        )}
      </div>
    </div>
  );
};
