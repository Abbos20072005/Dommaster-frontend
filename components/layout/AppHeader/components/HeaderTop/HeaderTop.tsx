import { BoxIcon, MapPinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';

import { LocaleSwitcher } from './components';

export const HeaderTop = () => {
  const t = useTranslations();
  return (
    <div className='mx-auto mt-2 flex h-6 max-w-[1272px] justify-between px-2 md:px-4'>
      <div className='flex gap-4'>
        <Link
          href='/offices'
          className='hover:text-secondary text-muted-foreground text-sm transition-colors'
        >
          {t('Stores')}
        </Link>
        <Link
          href='/services/delivery'
          className='hover:text-secondary text-muted-foreground text-sm transition-colors'
        >
          {t('Delivery and lifting')}
        </Link>
      </div>
      <div className='flex gap-4'>
        <LocaleSwitcher />
        <div className='flex items-center gap-1 text-sm'>
          <MapPinIcon className='size-4' />
          <span>{t('Tashkent')}</span>
        </div>
        <Link
          href='/cabinet/orders'
          className='hover:text-secondary flex items-center gap-1 text-sm transition-colors'
        >
          <BoxIcon className='size-4' />
          {t('Orders')}
        </Link>
      </div>
    </div>
  );
};
