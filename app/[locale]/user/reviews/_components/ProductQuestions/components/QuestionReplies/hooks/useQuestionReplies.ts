import { useInfiniteQuery } from '@tanstack/react-query';

import { getQuestionReplies } from '@/utils/api/requests';

interface Props {
  enabled: boolean;
  question: ProductQuestion;
}

export const useQuestionReplies = ({ question, enabled }: Props) => {
  const getProductQuestionRepliesQuery = useInfiniteQuery({
    queryKey: ['productQuestionReplies', question.id],
    queryFn: ({ pageParam }) =>
      getQuestionReplies({
        questionId: question.id,
        config: { params: { page: pageParam, page_size: 3 } }
      }),
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getProductQuestionRepliesQuery.fetchNextPage();
  };

  return {
    state: {
      replies: getProductQuestionRepliesQuery.data?.pages.flatMap(
        (page) => page.data.result.content
      ),
      totalCount:
        getProductQuestionRepliesQuery.data?.pages[0].data.result.totalElements ||
        question.reply_count,
      hasNextPage: getProductQuestionRepliesQuery.hasNextPage,
      isFetchingNextPage: getProductQuestionRepliesQuery.isFetchingNextPage,
      isLoading: getProductQuestionRepliesQuery.isLoading
    },
    functions: {
      onLoadMore
    }
  };
};
