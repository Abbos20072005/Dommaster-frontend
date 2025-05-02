'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { YandexMap } from '@/components/modules/location';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const CourierDeliveryPage = () => {
  const t = useTranslations();
  const mapRef = React.useRef<ymaps.Map>(undefined);

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
              <BreadcrumbLink href='/news'>{t('Delivery in Tashkent')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{t('Delivery in Tashkent')}</h1>
        <div className='h-[500px]'>
          <YandexMap className='rounded-lg' mapRef={mapRef} />
        </div>
        <p className='text-lg font-bold md:text-2xl'>{t('Delivery price')}: 100 000 UZS</p>
      </BaseLayout>
    </div>
  );
};

export default CourierDeliveryPage;
