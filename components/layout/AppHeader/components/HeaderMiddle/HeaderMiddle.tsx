'use client';

import { HandPlatterIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { Catalog, Search } from './components';

export const HeaderMiddle = () => {
  const t = useTranslations();
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn({ 'border-b': offset > 32 })}>
      <div className='mx-auto flex h-20 max-w-[1272px] items-center gap-4 px-2 md:px-4'>
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
          <Catalog />
          <Search />
        </div>
        <div className='ml-auto flex items-center justify-between gap-4 lg:gap-6'>
          <Link
            href='/favorites'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <HandPlatterIcon />
            <span className='hidden text-sm font-medium lg:inline'>{t('Services')}</span>
          </Link>
          <Link
            href='/favorites'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <HeartIcon />
            <span className='hidden text-sm font-medium lg:inline'>{t('Favorites')}</span>
          </Link>
          <AuthDialog className='hover:text-secondary flex flex-col items-center transition-colors'>
            <UserCircleIcon />
            <span className='hidden text-sm font-medium lg:inline'>{t('Login')}</span>
          </AuthDialog>
          <Link
            href='/cart'
            className='hover:text-secondary flex flex-col items-center transition-colors'
          >
            <ShoppingCartIcon />
            <span className='hidden text-sm font-medium lg:inline'>{t('Cart')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
