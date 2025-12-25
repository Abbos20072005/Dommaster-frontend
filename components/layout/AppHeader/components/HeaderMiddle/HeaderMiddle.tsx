'use client';

import { HandPlatterIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { AuthDialog } from '@/modules/auth';
import { Search } from '@/modules/search';
import { useAuth } from '@/utils/stores';

import { NavUser } from './components';
import { useHeaderMiddle } from './hooks';

export const HeaderMiddle = () => {
  const t = useTranslations();
  const { state } = useHeaderMiddle();
  const { user } = useAuth();

  return (
    <div
      className={cn('bg-background', { 'fixed inset-x-0 top-0 z-50 border-b': state.offset > 32 })}
    >
      <BaseLayout className='flex h-16 items-center gap-4'>
        <Link href='/'>
          <div className='flex items-center justify-center gap-2'>
            <Image
              alt='buildex'
              className='animate-spin-y size-9 duration-[5s]'
              height={36}
              src='/logo.png'
              width={36}
              priority
            />
            <Image
              alt='buildex'
              className='h-7 w-auto'
              height={28}
              src='/logo-text.png'
              width={128}
              priority
            />
          </div>
        </Link>
        <div className='flex flex-1 gap-2'>
          <Search />
        </div>
        <div className='ml-auto flex items-center justify-between gap-4 lg:gap-6'>
          <Link
            href='/services'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <HandPlatterIcon />
            <span className='hidden text-sm font-medium lg:inline'>{t('Services')}</span>
          </Link>
          <Link
            href='/user/favorites'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <div className='relative'>
              {!!state.favoritesLength && (
                <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
                  {state.favoritesLength}
                </div>
              )}
              <HeartIcon />
            </div>
            <span className='hidden text-sm font-medium lg:inline'>{t('Favorites')}</span>
          </Link>
          <Link
            href='/cart'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <div className='relative'>
              {!!state.cartItemsLength && (
                <div className='bg-secondary text-secondary-foreground absolute -top-0.5 -right-2 flex h-4 items-center justify-center rounded-full px-1.5 text-xs font-bold'>
                  {state.cartItemsLength}
                </div>
              )}
              <ShoppingCartIcon />
            </div>
            <span className='hidden text-sm font-medium lg:inline'>{t('Cart')}</span>
          </Link>
          {user ? (
            <NavUser className='hover:text-secondary flex w-11 flex-col items-center transition-colors'>
              <UserCircleIcon />
              <span className='hidden text-sm font-medium lg:inline'>{t('Profile')}</span>
            </NavUser>
          ) : (
            <AuthDialog className='hover:text-secondary flex w-11 flex-col items-center transition-colors'>
              <UserCircleIcon />
              <span className='hidden text-sm font-medium lg:inline'>{t('Login')}</span>
            </AuthDialog>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};
