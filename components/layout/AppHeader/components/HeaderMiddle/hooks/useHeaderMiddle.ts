import React from 'react';

import { useCartStore, useFavoritesStore } from '@/utils/stores';

export const useHeaderMiddle = () => {
  const [offset, setOffset] = React.useState(0);
  const { favorites } = useFavoritesStore();
  const { cartItemsLength } = useCartStore();

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    onScroll();

    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return {
    state: {
      offset,
      favoritesLength: favorites.length,
      cartItemsLength
    }
  };
};
