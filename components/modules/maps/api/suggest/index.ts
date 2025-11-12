import type { SuggestResponse } from '@yandex/ymaps3-types';

import axios from 'axios';

import { SUGGEST_API_KEY } from '@/components/modules/location';

interface GetSuggestRequest {
  params: {
    text: string;
  };
}

export const getSuggest = ({ params }: GetSuggestRequest) =>
  axios.get<{
    results: SuggestResponse;
  }>('https://suggest-maps.yandex.ru/v1/suggest', {
    params: {
      apikey: SUGGEST_API_KEY,
      ...params
    }
  });
