import Image from 'next/image';
import React from 'react';

import { MobileSearch } from '@/components/modules/search';

export const MobileHeader = () => {
  return (
    <div className='md:hidden'>
      <div className='py-4'>
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
      </div>
      <div className='px-4 pb-4'>
        <MobileSearch />
      </div>
    </div>
  );
};
