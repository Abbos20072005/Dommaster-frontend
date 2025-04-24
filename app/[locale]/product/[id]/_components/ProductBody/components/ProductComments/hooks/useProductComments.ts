import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '@/utils/api/requests';

export const useProductComments = (product: Product) => {
  const getProductCommentsQuery = useInfiniteQuery({
    queryKey: ['productComments', product.id],
    queryFn: ({ pageParam }) =>
      getComments({
        config: { params: { product_id: product.id, page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getProductCommentsQuery.fetchNextPage();
  };

  return {
    state: {
      comments: getProductCommentsQuery.data?.pages.flatMap((page) => page.data.result.content),
      hasNextPage: getProductCommentsQuery.hasNextPage,
      isFetchingNextPage: getProductCommentsQuery.isFetchingNextPage,
      isLoading: getProductCommentsQuery.isLoading
    },
    functions: {
      onLoadMore
    }
  };
};
