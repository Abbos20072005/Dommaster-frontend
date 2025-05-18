'use client';

import { HandPlatterIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { AuthDialog } from '@/components/modules/auth';
import { Search } from '@/components/modules/search';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
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
          <div className='flex items-center justify-center gap-1'>
            <Image
              alt='dommaster'
              className='animate-spin-y w-10 pb-1 duration-[5s]'
              height={26}
              src='/logo.png'
              width={40}
              priority
            />
            <span className='text-2xl font-bold'>
              <span className='text-secondary'>DOM</span>
              <span className='text-primary'>MASTER</span>
            </span>
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
