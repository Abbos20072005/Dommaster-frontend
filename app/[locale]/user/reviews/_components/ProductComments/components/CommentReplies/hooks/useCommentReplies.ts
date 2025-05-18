import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentReplies } from '@/utils/api/requests';

interface Props {
  comment: ProductComment;
  enabled: boolean;
}

export const useCommentReplies = ({ comment, enabled }: Props) => {
  const getProductCommentRepliesQuery = useInfiniteQuery({
    queryKey: ['productCommentReplies', comment.id],
    queryFn: ({ pageParam }) =>
      getCommentReplies({
        commentId: comment.id,
        config: { params: { page: pageParam, page_size: 3 } }
      }),
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getProductCommentRepliesQuery.fetchNextPage();
  };

  return {
    state: {
      replies: getProductCommentRepliesQuery.data?.pages.flatMap(
        (page) => page.data.result.content
      ),
      totalCount:
        getProductCommentRepliesQuery.data?.pages[0].data.result.totalElements ||
        comment.reply_count,
      hasNextPage: getProductCommentRepliesQuery.hasNextPage,
      isFetchingNextPage: getProductCommentRepliesQuery.isFetchingNextPage,
      isLoading: getProductCommentRepliesQuery.isLoading
    },
    functions: {
      onLoadMore
    }
  };
};
