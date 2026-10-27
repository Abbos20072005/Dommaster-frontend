'use client';

import type { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';

import { StoreIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import React from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
  YMapZoomControl
} from 'ymap3-components';

import { getYmapsLang } from '@/modules/location/constants';
import { cn } from '@/lib/utils';

/** Tashkent: the map opens on the city, not on the whole country */
const TASHKENT: YMapLocationRequest = { center: [69.2401, 41.2995] as LngLat, zoom: 11 };

interface Props {
  stores: Store[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const StoresMap = ({ stores, selectedId, onSelect }: Props) => {
  const ymapsLang = getYmapsLang(useLocale());
  const selected = stores.find((store) => store.id === selectedId);

  // a chosen shop is brought to the middle of the map
  const location: YMapLocationRequest = selected
    ? { center: [selected.longitude, selected.latitude] as LngLat, zoom: 15, duration: 600 }
    : TASHKENT;

  return (
    <YMapComponentsProvider apiKey={process.env.YANDEX_KEY || ''} lang={ymapsLang}>
      <YMap location={location}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {stores.map((store) => (
          <YMapMarker
            coordinates={[store.longitude, store.latitude] as LngLat}
            key={store.id}
            onClick={() => onSelect(store.id)}
          >
            <button
              aria-label={store.name}
              className={cn(
                '-translate-x-1/2 -translate-y-full cursor-pointer transition-transform',
                store.id === selectedId && 'scale-125'
              )}
              type='button'
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full border-2 border-white shadow-md',
                  store.id === selectedId ? 'bg-secondary' : 'bg-primary'
                )}
              >
                <StoreIcon className='size-[18px] text-white' />
              </span>
            </button>
          </YMapMarker>
        ))}

        <YMapControls position='right'>
          <YMapZoomControl />
        </YMapControls>
      </YMap>
    </YMapComponentsProvider>
  );
};
