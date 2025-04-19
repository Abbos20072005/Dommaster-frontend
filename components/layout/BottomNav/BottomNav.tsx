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

import { AuthDialog } from '@/components/modules/auth';
import { MobileCatalogDialog } from '@/components/modules/catalog';
import { NavigationLink } from '@/components/NavigationLink';
import { useAuth } from '@/utils/stores';

import { useBottomNav } from './hooks';

export const BottomNav = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { state } = useBottomNav();

  return (
    <div className='grid grid-cols-5 gap-4 py-2 shadow-md md:hidden'>
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
          {!!state.cartItemsLength.length && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {state.cartItemsLength.length}
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
          {!!state.favoritesLength.length && (
            <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
              {state.favoritesLength.length}
            </div>
          )}
          <HeartIcon />
        </div>
        <span className='text-xs font-medium'>{t('Favorites')}</span>
      </NavigationLink>
      {user ? (
        <NavigationLink
          href='/user/dashboard'
          activeClassName='text-foreground'
          className='text-muted-foreground flex flex-col items-center transition-colors'
        >
          <UserCircleIcon className='size-5' />
          <span className='text-xs font-medium'>{t('Profile')}</span>
        </NavigationLink>
      ) : (
        <AuthDialog className='text-muted-foreground flex flex-col items-center transition-colors'>
          <UserCircleIcon className='size-5' />
          <span className='text-xs font-medium'>{t('Login')}</span>
        </AuthDialog>
      )}
    </div>
  );
};
