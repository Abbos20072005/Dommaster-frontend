'use client';

import { ChevronLeftIcon } from 'lucide-react';
import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  title: string;
  subtitle?: string;
  /** where the arrow leads; the cabinet home by default */
  backHref?: string;
}

/** The title bar of a cabinet page on a phone: a back arrow and the title. */
export const MobilePageHeader = ({ title, subtitle, backHref = '/user/dashboard' }: Props) => (
  <div className='sticky top-0 z-10 mb-3 flex h-14 items-center gap-1 border-b border-[#E1E5EB] bg-white px-2 md:hidden'>
    <Link
      aria-label='Back'
      className='flex size-11 items-center justify-center rounded-full active:bg-[#EDF0F5]'
      href={backHref}
    >
      <ChevronLeftIcon className='size-6' />
    </Link>
    <div className='grid min-w-0'>
      <span className='truncate text-[17px] leading-6 font-bold'>{title}</span>
      {subtitle && <span className='text-xs leading-4 text-[#6B7685]'>{subtitle}</span>}
    </div>
  </div>
);
