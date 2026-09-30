'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

// `ymap3-components` serverda (SSR) "document is not defined" xatosini beradi —
// xarita faqat brauzerda yuklanadi
const DeliveryZoneMap = dynamic(
  () => import('./_components/DeliveryZoneMap').then((module) => module.DeliveryZoneMap),
  { ssr: false, loading: () => <Skeleton className='h-full w-full' /> }
);

const CourierDeliveryPage = () => {
  const t = useTranslations();
  // ESKI KOD (ishlatilmagan edi): const mapRef = React.useRef<ymaps.Map>(undefined);

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-6 md:mt-4 md:space-y-8'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('Delivery in Tashkent')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{t('Delivery in Tashkent')}</h1>
        <div className='h-500px'>
          <DeliveryZoneMap />
          {/* ESKI KOD: xarita shu yerda bevosita chizilardi — endi ./_components/DeliveryZoneMap.tsx'da */}
        </div>
        <p className='text-lg font-bold md:text-2xl'>{t('Delivery price')}: 100 000 UZS</p>
      </BaseLayout>
    </div>
  );
};

export default CourierDeliveryPage;
