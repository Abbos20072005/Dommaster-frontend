import type { YMapCenterLocation, YMapLocationRequest } from '@yandex/ymaps3-types';

export const LOCATION: YMapLocationRequest & YMapCenterLocation = {
  center: [69.2401, 41.2995],
  zoom: 8
};

export const GEOCODE_API_KEY: string = process.env.YANDEX_KEY || '';
export const SUGGEST_API_KEY: string = process.env.SUGGEST_KEY || '';
export const COMMON_LOCATION_PARAMS: YMapLocationRequest = {
  easing: 'ease-in-out',
  duration: 1000,
  zoom: 16
};
