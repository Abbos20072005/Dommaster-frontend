import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getCartList, getFavorites } from '@/utils/api/requests';

export const useHeaderMiddle = () => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    onScroll();

    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

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
      offset,
      favoritesLength,
      cartItemsLength
    }
  };
};
