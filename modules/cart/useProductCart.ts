import { useMutation } from '@tanstack/react-query';

import { patchCart, postCart } from '@/utils/api/requests';
import { useCartStore } from '@/utils/stores';

export const useProductCart = (product: Product) => {
  const { cartItemsQuantityMap, setCartItemQuantity } = useCartStore();

  const postCartMutation = useMutation({
    mutationFn: postCart
  });

  const patchCartMutation = useMutation({
    mutationFn: patchCart
  });

  const onAddToCart = () => {
    const previousQuantity = cartItemsQuantityMap[product.id] ?? 0;
    setCartItemQuantity(product.id, 1);
    postCartMutation.mutate(
      { data: { product: product.id, quantity: 1 } },
      { onError: () => setCartItemQuantity(product.id, previousQuantity) }
    );
  };

  const onCartCountChange = (value: number) => {
    const previousQuantity = cartItemsQuantityMap[product.id] ?? 0;
    setCartItemQuantity(product.id, value);
    patchCartMutation.mutate(
      { data: { product: product.id, quantity: value } },
      { onError: () => setCartItemQuantity(product.id, previousQuantity) }
    );
  };

  const onRemoveFromCart = async () => {
    const previousQuantity = cartItemsQuantityMap[product.id] ?? 0;
    setCartItemQuantity(product.id, 0);
    return await patchCartMutation.mutateAsync(
      { data: { product: product.id, quantity: 0 } },
      { onError: () => setCartItemQuantity(product.id, previousQuantity) }
    );
  };

  return {
    state: {
      cartCount: cartItemsQuantityMap[product.id] ?? 0,
      isCartAdding: postCartMutation.isPending
    },
    functions: {
      onAddToCart,
      onCartCountChange,
      onRemoveFromCart
    }
  };
};
