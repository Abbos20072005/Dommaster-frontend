import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';

export const useCart = () => {
  const getCartListQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartList()
  });

  const cart = getCartListQuery.data?.data.result;

  const overallPrice =
    cart?.cart_items.reduce(
      (acc, item) => acc + (item.is_checked ? item.product.price : 0) * item.quantity,
      0
    ) || 0;

  const overallPriceWithDiscount =
    cart?.cart_items.reduce(
      (acc, item) =>
        acc +
        (item.is_checked ? (item.product.discount_price ?? item.product.price) : 0) * item.quantity,
      0
    ) || 0;

  const overallBenefit = overallPrice - overallPriceWithDiscount;

  return {
    cart,
    overallPrice,
    overallPriceWithDiscount,
    overallBenefit,
    ...getCartListQuery
  };
};
