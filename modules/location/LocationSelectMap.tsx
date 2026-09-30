'use client';

import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';

// `ymap3-components` modul yuklanishi bilanoq `document`ga murojaat qiladi — serverda (SSR)
// "document is not defined" xatosi chiqadi. Shuning uchun xarita faqat brauzerda yuklanadi.
export const LocationSelectMap = dynamic(
  () => import('./LocationSelectMapClient').then((module) => module.LocationSelectMap),
  {
    ssr: false,
    loading: () => <Skeleton className='min-h-300px w-full flex-1 rounded-none' />
  }
);
