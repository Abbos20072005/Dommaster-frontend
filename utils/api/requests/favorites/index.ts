import { api } from '@/utils/api/instance';

export const getFavorites = (requestConfig?: RequestConfig) =>
  api.get<FavoritesResponse>('/favourites/', requestConfig?.config);

export const postFavorite = ({ data, config }: RequestConfig<{ product: number }>) =>
  api.post<FavoriteResponse>('/favourites/', data, config);
