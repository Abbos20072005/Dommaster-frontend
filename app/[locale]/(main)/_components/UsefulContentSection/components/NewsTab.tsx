import { format } from 'date-fns';
import Image from 'next/image';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';
import { getNewsList } from '@/utils/api/requests';

export const NewsTab = async () => {
  const newsResponse = await getNewsList();
  const news = newsResponse.data.result.content;

  return (
    <Carousel>
      <CarouselContent>
        {news.map((item) => (
          <CarouselItem key={item.id} className='basis-[280px] md:basis-1/3 lg:basis-1/4'>
            <Link href={`/news/${item.id}`}>
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
                  <p className='line-clamp-2 text-sm md:line-clamp-4'>{item.title}</p>
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
