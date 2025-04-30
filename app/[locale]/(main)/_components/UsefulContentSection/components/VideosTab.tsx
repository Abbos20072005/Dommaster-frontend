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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { getVideos } from '@/utils/api/requests';

function getYouTubeVideoId(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const VideosTab = async () => {
  const videosResponse = await getVideos();
  const videos = videosResponse.data.result;

  return (
    <Carousel>
      <CarouselContent>
        {videos.map((item) => (
          <CarouselItem key={item.id} className='basis-[280px] md:basis-1/3 lg:basis-1/4'>
            <Dialog>
              <DialogTrigger asChild>
                <Card
                  className='hover:bg-muted flex h-full cursor-pointer flex-col transition-colors'
                  variant='outline'
                >
                  <div className='relative'>
                    <Image
                      alt={item.name}
                      className='aspect-video rounded-t-lg object-cover'
                      height={180}
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(item.url)}/hqdefault.jpg`}
                      width={320}
                    />
                    <Image
                      alt='play'
                      className='absolute top-1/2 left-1/2 z-1 size-15 -translate-x-1/2 -translate-y-1/2'
                      height={60}
                      src='/play-icon.png'
                      width={60}
                    />
                  </div>
                  <CardHeader className='flex-1 p-3'>
                    <p className='text-sm'>{item.name}</p>
                  </CardHeader>
                  <CardFooter className='p-3 pt-0'>
                    <span className='text-muted-foreground text-sm'>
                      {format(item.created_at, 'dd.MM.yyyy')}
                    </span>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className='w-full md:max-w-4xl'>
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                </DialogHeader>
                <iframe
                  className='aspect-video h-auto w-full overflow-hidden rounded-md'
                  height='450'
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.url)}`}
                  title={item.name}
                  width='900'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  frameBorder='0'
                ></iframe>
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
