import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';

export const useCart = () => {
  const getCartListQuery = useQuery({
    queryKey: ['cart'],
    staleTime: 0,
    queryFn: () => getCartList()
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
