import { useQuery } from '@tanstack/react-query';

import { getCartList, getFavorites } from '@/utils/api/requests';

export const useBottomNav = () => {
  const getFavoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavorites()
  });

  const favoritesLength = getFavoritesQuery.data?.data.result || [];

  const getCartListQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartList()
  });

  const cartItemsLength = getCartListQuery.data?.data.result.cart_items || [];

  return {
    state: {
      favoritesLength,
      cartItemsLength
    }
  };
};
