import { useYMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';

export const useLocationName = (coords?: number[]) => {
  const ymaps = useYMaps(['geocode']);
  const [locationName, setLocationName] = useState<string>();

  useEffect(() => {
    if (!ymaps || !coords) return;

    ymaps
      .geocode(coords)
      .then((result: any) => {
        const firstGeoObject = result.geoObjects.get(0);
        if (firstGeoObject) {
          const properties = firstGeoObject.properties;
          const location = String(properties.get('description') || '');
          const address = String(properties.get('name') || '');
          setLocationName(`${location}, ${address}`);
        }
      })
      .catch((err) => {
        console.error('Error geocoding coordinates:', err);
      });
  }, [coords, ymaps]);

  return locationName;
};
