import { FacebookIcon, InstagramIcon, SendIcon, YoutubeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const Socials = () => {
  return (
    <div className='mt-4 flex gap-3 md:mt-6'>
      <Button asChild size='icon' variant='outline'>
        <a href='#' rel='noreferrer' target='_blank'>
          <FacebookIcon className='size-6' />
        </a>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a href='#' rel='noreferrer' target='_blank'>
          <SendIcon className='size-6' />
        </a>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a href='#' rel='noreferrer' target='_blank'>
          <InstagramIcon className='size-6' />
        </a>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a href='#' rel='noreferrer' target='_blank'>
          <YoutubeIcon className='size-6' />
        </a>
      </Button>
    </div>
  );
};
