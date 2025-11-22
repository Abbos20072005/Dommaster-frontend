import type { BehaviorMapEventHandler, LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';
import {
  YMap,
  YMapComponentsProvider,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeature,
  YMapGeolocationControl,
  YMapListener,
  YMapZoomControl
} from 'ymap3-components';

import type { MapLocation } from '@/components/modules/location';

import { COMMON_LOCATION_PARAMS, LocationSelectCombobox } from '@/components/modules/location';
import { getGeocode } from '@/components/modules/maps/api/geocode';
import { MAP } from '@/utils/constants';

interface Props {
  value: MapLocation;
  onValueChange: (location: MapLocation) => void;
}

export const LocationSelectMap = ({ value, onValueChange }: Props) => {
  const t = useTranslations();

  const [mapPosition, setMapPosition] = React.useState<YMapLocationRequest>({
    center: [value.longitude, value.latitude] as LngLat,
    zoom: 17
  });

  const postAddressQuery = useMutation({
    mutationFn: (pos: LngLat) => getGeocode({ params: { geocode: pos.join(), results: 1 } }),
    onSuccess: ({ data }) => {
      const [lng, lat] =
        data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.Point.pos.split(
          ' '
        );
      const address =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty
          .GeocoderMetaData.text;

      onValueChange({
        longitude: +lng,
        latitude: +lat,
        location_name: address
      });
    }
  });

  const onGeolocationChange = (pos: LngLat) => {
    setMapPosition({ center: pos, zoom: 18 });
    postAddressQuery.mutate(pos);
  };

  const handleActionEnd = (evt: BehaviorMapEventHandler['arguments']) => {
    setMapPosition({ center: evt.location.center, zoom: evt.location.zoom });
    postAddressQuery.mutate(evt.location.center);
  };

  const onLocationInputChange = (location: MapLocation) => {
    if (location) setMapPosition({ center: [location.longitude, location.latitude], zoom: 18 });
    postAddressQuery.mutate([location.longitude, location.latitude]);
  };

  return (
    <div className='relative min-h-0 flex-1'>
      <div className='absolute top-0 right-0 z-20 w-full max-w-md p-2'>
        <LocationSelectCombobox
          className='w-full text-ellipsis'
          value={value}
          onValueChange={onLocationInputChange}
          placeholder={t('Search')}
        />
      </div>
      <YMapComponentsProvider apiKey={process.env.YANDEX_KEY || ''} lang='uz_UZ'>
        <YMap location={mapPosition}>
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
            <YMapGeolocationControl
              onGeolocateError={() => toast.error(t('Unable to find your location.'))}
              onGeolocatePosition={onGeolocationChange}
              {...COMMON_LOCATION_PARAMS}
            />
            <YMapZoomControl />
          </YMapControls>

          <YMapListener onActionEnd={handleActionEnd} />

          <div className='pointer-events-none absolute bottom-1/2 left-1/2 z-10 -translate-x-1/2'>
            <Image alt='placemark' height={65} src='/placemark.png' width={65} />
          </div>
        </YMap>
      </YMapComponentsProvider>
    </div>
  );
};
