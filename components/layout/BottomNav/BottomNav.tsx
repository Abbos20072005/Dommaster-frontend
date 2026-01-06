'use client';

import {
  HeartIcon,
  HomeIcon,
  PackageSearchIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { NavigationLink } from '@/components/NavigationLink';
import { useCartStore, useFavoritesStore } from '@/utils/stores';

export const BottomNav = () => {
  const t = useTranslations();
  const { favorites } = useFavoritesStore();
  const { cartItemsLength } = useCartStore();

  return (
    <div className='bg-background fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 rounded-t-lg px-1 pt-3 pb-4 shadow-md md:hidden'>
      <NavigationLink
        href='/'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center gap-1 transition-colors'
      >
        <HomeIcon className='size-6' />
        <span className='text-xs font-medium text-nowrap'>{t('Home')}</span>
      </NavigationLink>
      <NavigationLink
        href='/catalog'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center gap-1 transition-colors'
      >
        <PackageSearchIcon className='size-6' />
        <span className='text-xs font-medium text-nowrap'>{t('Catalog')}</span>
      </NavigationLink>
      <NavigationLink
        href='/cart'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center gap-1 transition-colors'
      >
        <div className='relative'>
          {!!cartItemsLength && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {cartItemsLength}
            </div>
          )}
          <ShoppingCartIcon className='size-6' />
        </div>
        <span className='text-xs font-medium text-nowrap'>{t('Cart')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/favorites'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center gap-1 transition-colors'
      >
        <div className='relative'>
          {!!favorites.length && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {favorites.length}
            </div>
          )}
          <HeartIcon className='size-6' />
        </div>
        <span className='text-xs font-medium text-nowrap'>{t('Favorites')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/dashboard'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center gap-1 transition-colors'
      >
        <UserCircleIcon className='size-6' />
        <span className='text-xs font-medium text-nowrap'>{t('Profile')}</span>
      </NavigationLink>
    </div>
  );
};
