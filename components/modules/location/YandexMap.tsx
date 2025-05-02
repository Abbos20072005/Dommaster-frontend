import { GeolocationControl, Map, Placemark, Polygon } from '@pbe/react-yandex-maps';
import React from 'react';

import { cn } from '@/lib/utils';
import { MAP } from '@/utils/constants';

interface Props extends React.ComponentProps<typeof Map> {
  coordinates?: number[];
  mapRef: React.RefObject<ymaps.Map | undefined>;
  setCoordinates?: (coords: number[]) => void;
}

export const YandexMap = ({ mapRef, className, coordinates, setCoordinates, ...props }: Props) => {
  const onMapClick = (e: any) => {
    const coords = e.get('coords');
    if (coords) setCoordinates?.(coords);
  };

  return (
    <Map
      className={cn('size-full overflow-hidden', className)}
      instanceRef={mapRef}
      modules={['control.ZoomControl']}
      {...props}
      defaultState={{
        center: MAP.center,
        zoom: MAP.zoom,
        controls: ['zoomControl'],
        ...props.defaultState
      }}
      onClick={onMapClick}
      options={{
        maxZoom: 17
      }}
    >
      <Polygon
        geometry={[MAP.availablePolygon]}
        options={{
          fillColor: 'rgba(146,146,146,0.25)',
          strokeColor: '#ffa31a',
          opacity: 0.5,
          strokeWidth: 3,
          interactivityModel: 'default#transparent'
        }}
      />
      <Placemark geometry={coordinates} />
      <GeolocationControl options={{ float: 'left' }} />
    </Map>
  );
};
