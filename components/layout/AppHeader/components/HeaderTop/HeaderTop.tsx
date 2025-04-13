import { MapPinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';

import { LocaleSwitcher } from './components';

export const HeaderTop = () => {
  const t = useTranslations();
  return (
    <div className='mx-auto mt-2 flex h-6 max-w-[1272px] justify-between px-2 md:px-4'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-sm'>
          <MapPinIcon className='size-4' />
          <span>{t('Tashkent')}</span>
        </div>
        <Link href='/offices' className='hover:text-secondary text-sm transition-colors'>
          {t('Stores')}
        </Link>
        <Link href='/services/delivery' className='hover:text-secondary text-sm transition-colors'>
          {t('Delivery and lifting')}
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <LocaleSwitcher />
        <Link
          href='tel:+998712099944'
          className='hover:text-secondary text-foreground/70 text-sm font-bold transition-colors'
        >
          +998 71 209 99 44
        </Link>
      </div>
    </div>
  );
};
