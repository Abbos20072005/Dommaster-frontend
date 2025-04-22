import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';

export const useCart = () => {
  const getCartListQuery = useQuery({
    queryKey: ['cart'],
    staleTime: 0,
    queryFn: () => getCartList()
  });

  const cart = getCartListQuery.data?.data.result;

  return {
    cart,
    ...getCartListQuery
  };
};
