import { api } from '@/utils/api/instance';

export const postFavorite = ({ data, config }: RequestConfig<{ product_id: number }>) =>
  api.post('favorites/', data, config);
