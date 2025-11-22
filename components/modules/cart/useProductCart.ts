import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { patchCart, postCart } from '@/utils/api/requests';

export const useProductCart = (product: Product) => {
  const [cartCount, setCartCount] = React.useState(product.in_cart_quantity);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setCartCount(product.in_cart_quantity);
  }, [product.in_cart_quantity]);

  const postCartMutation = useMutation({
    mutationFn: postCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const patchCartMutation = useMutation({
    mutationFn: patchCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
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

  const onRemoveFromCart = () => {
    patchCartMutation.mutate({ data: { product: product.id, quantity: 0 } });
    setCartCount(0);
  };

  return {
    state: {
      cartCount,
      isCartAdding: postCartMutation.isPending
    },
    functions: {
      onAddToCart,
      onCartCountChange,
      onRemoveFromCart
    }
  };
};
