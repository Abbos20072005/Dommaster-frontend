'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { getNewsList } from '@/utils/api/requests';

export const NewsList = () => {
  const t = useTranslations();
  const getNewsQuery = useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({ pageParam }) =>
      getNewsList({
        config: { params: { page: pageParam, page_size: 10 } }
      }),
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage.data.result.last ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1
  });

  const onLoadMore = () => {
    getNewsQuery.fetchNextPage();
  };

  const news = getNewsQuery.data?.pages.flatMap((page) => page.data.result.content);

  if (getNewsQuery.isLoading) {
    return (
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className='h-[250px] w-full' />
        ))}
      </div>
    );
  }

  if (news?.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 py-20'>
        <p className='text-center font-bold'>{t('No news found')}</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {news?.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <Card
              className='hover:bg-muted flex h-full flex-col transition-colors'
              variant='outline'
            >
              <Image
                alt={item.title}
                className='aspect-video w-full rounded-t-lg object-cover'
                height={180}
                src={item.image}
                width={320}
              />
              <CardHeader className='flex-1 p-3'>
                <p className='text-sm'>{item.title}</p>
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
      {getNewsQuery.hasNextPage && (
        <Button
          className='w-full'
          disabled={getNewsQuery.isFetchingNextPage}
          size='sm'
          variant='outline'
          onClick={onLoadMore}
        >
          <Spinner show={getNewsQuery.isFetchingNextPage} />
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
