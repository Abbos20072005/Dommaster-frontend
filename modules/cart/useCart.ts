import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';
import { useCartStore } from '@/utils/stores';

export const useCart = () => {
  const { syncCart, getIsCartItemsSynced } = useCartStore();
  const getCartListQuery = useQuery({
    queryKey: ['products', 'cart'],
    queryFn: async () => {
      const res = await getCartList();
      if (res.data.ok) {
        const isSynced = getIsCartItemsSynced(res.data.result.cart_items);
        if (!isSynced) syncCart(res.data.result);
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
