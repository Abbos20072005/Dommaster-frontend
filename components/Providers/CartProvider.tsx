import { useQuery } from '@tanstack/react-query';

import { getCartList } from '@/utils/api/requests';
import { useCart } from '@/utils/stores';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { setCart } = useCart();

  useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await getCartList();
      if (res.data.ok) setCart(res.data.result);
      return res;
    }
  });

  return children;
};
