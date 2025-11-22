import { useInfiniteQuery } from '@tanstack/react-query';

import { getViewedProducts } from '@/utils/api/requests';

export const useViewedProducts = () => {
  const getViewedProductsQuery = useInfiniteQuery({
    queryKey: ['products', 'infinityViewed'],
    staleTime: 0,
    queryFn: ({ pageParam }) =>
      getViewedProducts({
        config: { params: { page: pageParam, page_size: 9 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages?.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getViewedProductsQuery.fetchNextPage();
  };

  return {
    state: {
      products: getViewedProductsQuery.data?.pages.flatMap((page) => page.data.result.content),
      hasNextPage: getViewedProductsQuery.hasNextPage,
      isFetchingNextPage: getViewedProductsQuery.isFetchingNextPage,
      isLoading: getViewedProductsQuery.isLoading
    },
    functions: {
      onLoadMore
    }
  };
};
