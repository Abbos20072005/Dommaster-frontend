'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { getArticles } from '@/utils/api/requests';

export const ArticlesList = () => {
  const t = useTranslations();
  const getArticlesQuery = useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) =>
      getArticles({
        config: { params: { page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getArticlesQuery.fetchNextPage();
  };

  const articles = getArticlesQuery.data?.pages.flatMap((page) => page.data.result.content);

  if (getArticlesQuery.isLoading) {
    return (
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className='h-[250px] w-full' />
        ))}
      </div>
    );
  }

  if (articles?.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 py-20'>
        <p className='text-center font-bold'>{t('No articles found')}</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {articles?.map((item) => (
          <Link href={`/articles/${item.id}`} key={item.id}>
            <Card
              className='hover:bg-muted flex h-full flex-col transition-colors'
              variant='outline'
            >
              <CardHeader className='flex-1 p-3'>
                <CardTitle className='leading-5'>{item.title}</CardTitle>
                <CardDescription className='line-clamp-6 text-sm'>
                  {item.short_description}
                </CardDescription>
              </CardHeader>
              <CardFooter className='p-3 pt-0'>
                <span className='text-muted-foreground text-sm'>
                  {format(item.created_at, 'dd.MM.yyyy')}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {getArticlesQuery.hasNextPage && (
        <Button
          className='w-full'
          disabled={getArticlesQuery.isFetchingNextPage}
          size='sm'
          variant='outline'
          onClick={onLoadMore}
        >
          <Spinner show={getArticlesQuery.isFetchingNextPage} />
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
