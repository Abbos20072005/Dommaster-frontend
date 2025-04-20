import { useInfiniteQuery } from '@tanstack/react-query';

import { getQuestions } from '@/utils/api/requests';

export const useProductQuestions = (product: Product) => {
  const getProductQuestionsQuery = useInfiniteQuery({
    queryKey: ['productQuestions', product.id],
    queryFn: ({ pageParam }) =>
      getQuestions({
        config: { params: { product_id: product.id, page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getProductQuestionsQuery.fetchNextPage();
  };

  return {
    state: {
      questions: getProductQuestionsQuery.data?.pages.flatMap((page) => page.data.result.content),
      hasNextPage: getProductQuestionsQuery.hasNextPage,
      isFetchingNextPage: getProductQuestionsQuery.isFetchingNextPage,
      isLoading: getProductQuestionsQuery.isLoading
    },
    functions: {
      onLoadMore
    }
  };
};
