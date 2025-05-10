'use client';

import {
  HeartIcon,
  HomeIcon,
  PackageSearchIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useCart } from '@/components/modules/cart';
import { MobileCatalogDialog } from '@/components/modules/catalog';
import { NavigationLink } from '@/components/NavigationLink';
import { useFavorites } from '@/utils/stores';

export const BottomNav = () => {
  const t = useTranslations();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <div className='bg-background fixed inset-x-0 bottom-0 grid grid-cols-5 gap-4 py-2 shadow-md md:hidden'>
      <NavigationLink
        href='/'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <HomeIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Home')}</span>
      </NavigationLink>
      <MobileCatalogDialog className='text-muted-foreground flex flex-col items-center transition-colors'>
        <PackageSearchIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Catalog')}</span>
      </MobileCatalogDialog>
      <NavigationLink
        href='/cart'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <div className='relative'>
          {!!cart?.cart_items.length && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {cart.cart_items.length}
            </div>
          )}
          <ShoppingCartIcon className='size-5' />
        </div>
        <span className='text-xs font-medium'>{t('Cart')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/favorites'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <div className='relative'>
          {!!favorites?.length && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {favorites.length}
            </div>
          )}
          <HeartIcon className='size-5' />
        </div>
        <span className='text-xs font-medium'>{t('Favorites')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/dashboard'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <UserCircleIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Profile')}</span>
      </NavigationLink>
    </div>
  );
};
