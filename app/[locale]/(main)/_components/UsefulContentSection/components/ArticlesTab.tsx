import { format } from 'date-fns';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';
import { getArticles } from '@/utils/api/requests';

export const ArticlesTab = async () => {
  const articlesResponse = await getArticles();
  const articles = articlesResponse.data.result.content;

  return (
    <Carousel>
      <CarouselContent>
        {articles.map((item) => (
          <CarouselItem key={item.id} className='basis-[280px] md:basis-1/3 lg:basis-1/4'>
            <Link href={`/articles/${item.id}`}>
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
