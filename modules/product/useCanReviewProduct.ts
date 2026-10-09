import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/modules/auth';
import { getOrderById, getOrdersHistory } from '@/utils/api/requests';

const DELIVERED = 3; // OrderStatus.Delivered
const MAX_ORDERS = 20;

/** A review can be written only by a customer who has received this product. */
export const useCanReviewProduct = (product: Pick<Product, 'id' | 'is_commented'>) => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ['canReview', user?.id, product.id],
    enabled: !!user && !product.is_commented,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const history = await getOrdersHistory({
        config: { params: { page: 1, page_size: MAX_ORDERS } }
      });
      const delivered = history.data.result.content.filter((order) => order.status === DELIVERED);
      const orders = await Promise.all(delivered.map((order) => getOrderById({ id: order.id })));

      return orders.some((order) =>
        order.data.result.order_items.some((item) => item.product?.id === product.id)
      );
    }
  });

  return !!user && !product.is_commented && !!query.data;
};
