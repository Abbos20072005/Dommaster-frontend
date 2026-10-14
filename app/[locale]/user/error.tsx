'use client';

import { AlertCircleIcon, RotateCwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL_LINKS } from '@/utils/constants';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/** The page of the cabinet could not load: the header and the menu stay, the user can leave. */
const UserError = ({ error, reset }: Props) => {
  const t = useTranslations();
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    setTime(new Date().toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }));
  }, []);

  return (
    <div className='border-border grid justify-items-center gap-3 rounded-2xl border bg-white px-6 py-10 text-center md:rounded-xl md:py-14'>
      <span className='flex size-12 items-center justify-center rounded-full bg-[#FDECEC] text-[#B42318]'>
        <AlertCircleIcon className='size-6' />
      </span>
      <h1 className='text-[20px] leading-[26px] font-bold md:text-[28px] md:leading-9'>
        {t('Something went wrong')}
      </h1>
      <p className='max-w-[360px] text-sm leading-5 text-[#4A5563]'>
        {t('Could not open the page, try again in a minute')}
      </p>
      <Button className='mt-2 h-11 w-full px-6 md:w-auto' onClick={reset}>
        <RotateCwIcon className='size-4' />
        {t('Try again')}
      </Button>
      <div className='border-border mt-4 grid w-full max-w-[420px] gap-1 border-t pt-4 text-[13px] leading-[18px] text-[#4A5563]'>
        <span>
          {t('If the error repeats, call')}{' '}
          <a className='text-primary font-bold' href={CONTACT_PHONE_HREF}>
            {CONTACT_PHONE}
          </a>{' '}
          {t('or write in')}{' '}
          <a
            className='text-primary font-bold'
            href={SOCIAL_LINKS.telegram}
            rel='noreferrer'
            target='_blank'
          >
            Telegram
          </a>
        </span>
        <span className='text-muted-foreground text-xs'>
          {t('Error code')} {error.digest ?? '500'} {time && `· ${time}`}
        </span>
      </div>
    </div>
  );
};

export default UserError;
