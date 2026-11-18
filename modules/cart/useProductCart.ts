import { useMutation } from '@tanstack/react-query';

import { usePathname } from '@/i18n/navigation';
import { trackAddToCart } from '@/lib/analytics';
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

  const onAddQuantity = (quantity: number) => {
    const previousQuantity = cartItemsQuantityMap[product.id] ?? 0;
    setCartItemQuantity(product.id, quantity);
    postCartMutation.mutate(
      { data: { product: product.id, quantity } },
      {
        onSuccess: () => trackAddToCart(product),
        onError: () => setCartItemQuantity(product.id, previousQuantity)
      }
    );
  };

  const onAddToCart = () => onAddQuantity(1);

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
      onAddQuantity,
      onCartCountChange,
      onRemoveFromCart
    }
  };
};
