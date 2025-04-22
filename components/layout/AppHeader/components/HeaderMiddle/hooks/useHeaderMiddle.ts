import React from 'react';

import { useCart } from '@/components/modules/cart';
import { useFavorites } from '@/utils/stores';

export const useHeaderMiddle = () => {
  const [offset, setOffset] = React.useState(0);
  const { favorites } = useFavorites();
  const { cart } = useCart();

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
      favoritesLength: favorites?.length,
      cartItemsLength: cart?.cart_items.length
    }
  };
};
