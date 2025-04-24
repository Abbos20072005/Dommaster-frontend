import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyQuestions } from '@/utils/api/requests';

export const useProductQuestions = () => {
  const getProductQuestionsQuery = useInfiniteQuery({
    queryKey: ['myQuestions'],
    queryFn: ({ pageParam }) =>
      getMyQuestions({
        config: { params: { page: pageParam, page_size: 10 } }
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
