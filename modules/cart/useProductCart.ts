import { useMutation } from '@tanstack/react-query';

import { usePathname } from '@/i18n/navigation';
import { patchCart, postCart } from '@/utils/api/requests';
import { useCartStore } from '@/utils/stores';

export const useProductCart = (product: Product) => {
  const { cartItemsQuantityMap, setCartItemQuantity } = useCartStore();
  const pathname = usePathname();

  const shouldRefetchCart = pathname === '/cart';

  const postCartMutation = useMutation({
    mutationFn: postCart,
    meta: {
      invalidatesQuery: shouldRefetchCart ? ['products', 'cart'] : undefined
    }
  });

  const patchCartMutation = useMutation({
    mutationFn: patchCart,
    meta: {
      invalidatesQuery: shouldRefetchCart ? ['products', 'cart'] : undefined
    }
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

  const onRemoveFromCart = () => {
    const previousQuantity = cartItemsQuantityMap[product.id] ?? 0;
    setCartItemQuantity(product.id, 0);
    patchCartMutation.mutate(
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
