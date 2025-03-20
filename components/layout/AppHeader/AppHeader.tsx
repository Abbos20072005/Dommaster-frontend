'use client';

import {
  BoxIcon,
  HandPlatterIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Catalog, Location, PopularCategories, Search } from './components';

interface Props extends React.ComponentProps<'header'> {}

export const AppHeader = ({ className, children, ...props }: Props) => {
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
    <header className={cn('bg-background mb-8 hidden gap-3 md:block', className)} {...props}>
      <div>
        <div
          className={cn('mx-auto mt-2 flex h-6 max-w-[1272px] justify-between px-2 md:px-4', {
            'mb-20': offset > 32
          })}
        >
          <div className='flex gap-4'>
            <Link
              href='/stores'
              className='hover:text-primary text-muted-foreground text-sm transition-colors'
            >
              {t('Stores')}
            </Link>
            <Link
              href='/services/delivery'
              className='hover:text-primary text-muted-foreground text-sm transition-colors'
            >
              {t('Delivery and lifting')}
            </Link>
            <Link
              href='/services/delivery'
              className='hover:text-primary text-muted-foreground text-sm transition-colors'
            >
              B2B
            </Link>
          </div>
          <div className='flex gap-4'>
            <Location />
            <Link
              href='/cabinet/orders'
              className='hover:text-primary flex items-center gap-1 text-sm transition-colors'
            >
              <BoxIcon className='size-4' />
              {t('Orders')}
            </Link>
          </div>
        </div>
        <div
          className={cn({
            'bg-background fixed inset-x-0 top-0 z-50 border-b': offset > 32
          })}
        >
          <div className='mx-auto flex h-20 max-w-[1272px] items-center gap-4 px-2 md:px-4'>
            <Link href='/'>
              <div className='flex items-center justify-center gap-1'>
                <h1 className='text-2xl font-medium'>DOMMASTER</h1>
              </div>
            </Link>
            <div className='flex flex-1 gap-2'>
              <Catalog />
              <Search />
            </div>
            <div className='ml-auto inline-flex items-center justify-between gap-2 space-x-4'>
              <Link
                href='/favorites'
                className='hover:text-primary flex flex-col items-center transition-colors'
              >
                <HandPlatterIcon />
                <span className='text-sm font-medium'>{t('Services')}</span>
              </Link>
              <Link
                href='/favorites'
                className='hover:text-primary flex flex-col items-center transition-colors'
              >
                <HeartIcon />
                <span className='text-sm font-medium'>{t('Favorites')}</span>
              </Link>
              <AuthDialog className='hover:text-primary flex flex-col items-center transition-colors'>
                <UserCircleIcon />
                <span className='text-sm font-medium'>{t('Login')}</span>
              </AuthDialog>
              <Link
                href='/cart'
                className='hover:text-primary flex flex-col items-center transition-colors'
              >
                <ShoppingCartIcon />
                <span className='text-sm font-medium'>{t('Cart')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='mx-auto max-w-[1272px] px-2 md:px-4'>
          <PopularCategories />
        </div>
      </div>
    </header>
  );
};
