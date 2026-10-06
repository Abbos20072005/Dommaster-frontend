import { format } from 'date-fns';
import Image from 'next/image';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const YOUTUBE_ID_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;

const getYouTubeVideoId = (url: string) => url.match(YOUTUBE_ID_REGEX)?.[1] ?? null;

interface Props {
  video: Video;
}

/** Video preview card; a click opens the video in a dialog (YouTube embed). */
export const VideoCard = ({ video }: Props) => {
  const youTubeId = getYouTubeVideoId(video.url);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className='hover:bg-muted flex h-full cursor-pointer flex-col transition-colors'
          variant='outline'
        >
          <div className='relative'>
            <Image
              alt={video.name || 'Buildex'}
              className='aspect-video rounded-t-lg object-cover'
              height={180}
              src={`https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`}
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
            <p className='text-sm'>{video.name}</p>
          </CardHeader>
          <CardFooter className='p-3 pt-0'>
            <span className='text-muted-foreground text-sm'>
              {format(video.created_at, 'dd.MM.yyyy')}
            </span>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className='w-full md:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>{video.name}</DialogTitle>
        </DialogHeader>
        <iframe
          className='aspect-video h-auto w-full overflow-hidden rounded-md'
          height='450'
          src={`https://www.youtube.com/embed/${youTubeId}`}
          title={video.name}
          width='900'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          frameBorder='0'
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};
