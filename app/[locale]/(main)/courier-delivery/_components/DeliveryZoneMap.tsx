'use client';

import { useLocale } from 'next-intl';
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

import {
  COMMON_LOCATION_PARAMS,
  getAllCoordinates,
  getBounds,
  getYmapsLang
} from '@/modules/location';
import { MAP } from '@/utils/constants';

// Yetkazib berish hududi xaritasi (faqat brauzerda yuklanadi — page.tsx'dagi dynamic importga qarang)
export const DeliveryZoneMap = () => {
  const ymapsLang = getYmapsLang(useLocale());

  return (
    <YMapComponentsProvider apiKey={process.env.YANDEX_KEY || ''} lang={ymapsLang}>
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
  );
};
