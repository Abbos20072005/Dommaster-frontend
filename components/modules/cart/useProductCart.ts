import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { patchCart, postCart } from '@/utils/api/requests';

export const useProductCart = (product: Product) => {
  const [cartCount, setCartCount] = React.useState(product.in_cart ? 1 : 0);
  const queryClient = useQueryClient();

  const postCartMutation = useMutation({
    mutationFn: postCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const patchCartMutation = useMutation({
    mutationFn: patchCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const onAddToCart = () => {
    postCartMutation.mutate({ data: { product: product.id, quantity: 1 } });
    setCartCount(1);
  };

  const onCartCountChange = (value: number) => {
    patchCartMutation.mutate({ data: { product: product.id, quantity: value } });
    setCartCount(value);
  };

  return {
    state: {
      cartCount,
      isCartAdding: postCartMutation.isPending
    },
    functions: {
      onAddToCart,
      onCartCountChange
    }
  };
};
