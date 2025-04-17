import { api } from '@/utils/api/instance';

export const getFavorites = (requestConfig?: RequestConfig) =>
  api.get<FavoritesResponse>('/favourite/list/', requestConfig?.config);

export const postFavorite = ({ data, config }: RequestConfig<{ product: number }>) =>
  api.post<FavoriteResponse>('/favourite/create/', data, config);
