import { useQuery } from '@tanstack/react-query';

import { getFavorites } from '@/utils/api/requests';
import { useFavorites } from '@/utils/stores';

export const FavoritesProvider = ({ children }: React.PropsWithChildren) => {
  const { setFavorites } = useFavorites();

  useQuery({
    queryKey: ['products', 'favorites'],
    staleTime: 0,
    queryFn: async () => {
      const res = await getFavorites();
      if (res.data.ok) setFavorites(res.data.result.map((item) => item.product));
      return res;
    }
  });

  return children;
};
