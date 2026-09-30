import type { YMapCenterLocation, YMapLocationRequest } from '@yandex/ymaps3-types';

export const LOCATION: YMapLocationRequest & YMapCenterLocation = {
  center: [69.2401, 41.2995],
  zoom: 8
};

// Yandex xarita/geokoder tili sayt tiliga mos
export const YMAPS_LANG = {
  ru: 'ru_RU',
  uz: 'uz_UZ'
} as const;

export const getYmapsLang = (locale: string) =>
  YMAPS_LANG[locale as keyof typeof YMAPS_LANG] ?? YMAPS_LANG.ru;

export const GEOCODE_API_KEY: string = process.env.YANDEX_KEY || '';
export const SUGGEST_API_KEY: string = process.env.SUGGEST_KEY || '';
export const COMMON_LOCATION_PARAMS: YMapLocationRequest = {
  easing: 'ease-in-out',
  duration: 1000,
  zoom: 16
};
