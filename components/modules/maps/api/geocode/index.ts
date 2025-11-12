import axios from 'axios';

import { GEOCODE_API_KEY } from '@/components/modules/location';
// Geocode response type (simplified from Yandex Geocoder API v1)
interface GeocodeResponse {
  response: {
    GeoObjectCollection: {
      featureMember: Array<{
        GeoObject: {
          Point: {
            pos: string; // "longitude latitude" string
          };
          metaDataProperty: {
            GeocoderMetaData: {
              text: string;
              Address: {
                Components: {
                  kind: string;
                  name: string;
                }[];
              };
            };
          };
        };
      }>;
      metaDataProperty: {
        GeocoderResponseMetaData: {
          Point: {
            pos: string;
          };
        };
      };
    };
  };
}

interface GetGeocodeRequest {
  params: {
    geocode: string;
    format?: string;
    results?: number;
    lang?: string;
  };
}

export const getGeocode = async ({ params: { format = 'json', ...rest } }: GetGeocodeRequest) =>
  await axios.get<GeocodeResponse>('https://geocode-maps.yandex.ru/1.x/', {
    params: {
      apikey: GEOCODE_API_KEY,
      format,
      ...rest
    }
  });
