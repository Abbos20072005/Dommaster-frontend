import { getTranslations } from 'next-intl/server';

import { VideoCard } from '@/modules/video';
import { getVideos } from '@/utils/api/requests';

export const VideosList = async () => {
  const t = await getTranslations();
  const videosResponse = await getVideos();
  const videos = videosResponse.data.result;

  if (!videos.length) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 py-20'>
        <p className='text-center font-bold'>{t('No videos found')}</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};
