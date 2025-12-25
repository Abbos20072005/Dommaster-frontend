import { useQuery } from '@tanstack/react-query';

import { getFavorites } from '@/utils/api/requests';
import { useFavoritesStore } from '@/utils/stores';

export const FavoritesProvider = () => {
  const { setFavorites } = useFavoritesStore();

  useQuery({
    queryKey: ['products', 'favorites'],
    staleTime: 0,
    queryFn: async () => {
      const res = await getFavorites();
      if (res.data.ok) setFavorites(res.data.result.map((item) => item.product));
      return res;
    }
  });

  return null;
};
