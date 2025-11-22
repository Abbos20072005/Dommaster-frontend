'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeature,
  YMapGeolocationControl,
  YMapZoomControl
} from 'ymap3-components';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  COMMON_LOCATION_PARAMS,
  getAllCoordinates,
  getBounds
} from '@/components/modules/location';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { MAP } from '@/utils/constants';

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
              <BreadcrumbPage>{t('Delivery in Tashkent')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{t('Delivery in Tashkent')}</h1>
        <div className='h-[500px]'>
          <YMapComponentsProvider apiKey={process.env.YANDEX_KEY || ''} lang='uz_UZ'>
            <YMap
              className='h-full'
              location={{ bounds: getBounds(getAllCoordinates(MAP.availablePolygon)) }}
            >
              <YMapDefaultSchemeLayer />
              <YMapDefaultFeaturesLayer />

              <YMapFeature
                style={{
                  fill: 'var(--secondary)',
                  stroke: [{ color: 'var(--secondary)', width: 2 }],
                  fillOpacity: 0.1
                }}
                geometry={{
                  type: 'MultiPolygon',
                  coordinates: MAP.availablePolygon
                }}
              />

              <YMapControls position='right'>
                <YMapGeolocationControl {...COMMON_LOCATION_PARAMS} />
                <YMapZoomControl />
              </YMapControls>
            </YMap>
          </YMapComponentsProvider>
        </div>
        <p className='text-lg font-bold md:text-2xl'>{t('Delivery price')}: 100 000 UZS</p>
      </BaseLayout>
    </div>
  );
};

export default CourierDeliveryPage;
