import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';
import { useCartStore } from '@/utils/stores';

export const useCart = () => {
  const { setCartItems } = useCartStore();
  const getCartListQuery = useQuery({
    queryKey: ['products', 'cart'],
    staleTime: 0,
    queryFn: async () => {
      const res = await getCartList();
      if (res.data.ok) {
        setCartItems(
          res.data.result.cart_items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity
          }))
        );
      }
      return res;
    }
  });

  const cart = getCartListQuery.data?.data.result;
  const availableCartItems =
    cart?.cart_items.filter(
      (item) => item.is_checked && item.product.quantity >= item.product.in_cart_quantity
    ) || [];

  return {
    cart,
    availableCartItems,
    ...getCartListQuery
  };
};
