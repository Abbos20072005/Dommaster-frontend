import Image from 'next/image';
import React from 'react';

import { MobileSearch } from '@/components/modules/search';
import { Link } from '@/i18n/navigation';

import { HeaderMiddle, HeaderTop } from './components';
import { LocaleSwitcher } from './components/HeaderTop/components';

export const AppHeader = () => {
  return (
    <header className='bg-background sticky inset-x-0 -top-11 z-50 gap-3 md:-top-8'>
      <div className='hidden md:block'>
        <HeaderTop />
        <HeaderMiddle />
      </div>
      <div className='md:hidden'>
        <div className='px-4 pt-4'>
          <Link href='/' className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-1'>
              <Image
                alt='dommaster'
                className='animate-spin-y w-8 pb-1 duration-[5s]'
                height={21}
                src='/logo.png'
                width={32}
                priority
              />
              <span className='text-xl font-bold'>
                <span className='text-secondary'>DOM</span>
                <span className='text-primary'>MASTER</span>
              </span>
            </div>
            <LocaleSwitcher />
          </Link>
        </div>
        <div className='bg-background px-4 py-2'>
          <MobileSearch />
        </div>
      </div>
    </header>
  );
};
