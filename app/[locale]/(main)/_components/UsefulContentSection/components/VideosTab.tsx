import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { VideoCard } from '@/modules/video';
import { getVideos } from '@/utils/api/requests';

export const VideosTab = async () => {
  const videosResponse = await getVideos();
  const videos = videosResponse.data.result;

  return (
    <Carousel>
      <CarouselContent>
        {videos.map((item) => (
          <CarouselItem key={item.id} className='basis-[280px] md:basis-1/3 lg:basis-1/4'>
            <VideoCard video={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
