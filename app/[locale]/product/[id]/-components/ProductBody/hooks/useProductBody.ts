import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { productsData } from '@/fake-data/products';
import { getProductById } from '@/utils/api/requests';

export const useProductBody = () => {
  const { id } = useParams<{ id: string }>();

  const getProductQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id })
  });

  const data: ProductResponse = {
    result: productsData[0],
    ok: true
  };

  return {
    state: {
      product: data.result || getProductQuery.data?.data.result,
      isLoading: getProductQuery.isLoading
    }
  };
};
