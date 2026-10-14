'use client';

import { AlertCircleIcon, RotateCwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

/** One block of the page failed to load: the error replaces only that block, the rest works. */
export const BlockError = ({ title, description, onRetry, isRetrying }: Props) => {
  const t = useTranslations();

  return (
    <div
      className='border-border flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center md:p-5'
      role='alert'
    >
      <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEC] text-[#B42318]'>
        <AlertCircleIcon className='size-5' />
      </span>
      <div className='grid flex-1 gap-0.5'>
        <span className='text-[15px] leading-[22px] font-bold'>
          {title ?? t('Could not load orders')}
        </span>
        <span className='text-muted-foreground text-[13px] leading-[18px]'>
          {description ?? t('Network error, other sections work')}
        </span>
      </div>
      <Button
        className='h-11 px-5'
        isLoading={isRetrying}
        type='button'
        variant='outline'
        onClick={onRetry}
      >
        <RotateCwIcon className='size-4' />
        {t('Try again')}
      </Button>
    </div>
  );
};
