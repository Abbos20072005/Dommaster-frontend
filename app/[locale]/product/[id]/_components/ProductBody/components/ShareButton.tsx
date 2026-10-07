'use client';

import { Share2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
  /** matnli (kengroq) tugma */
  withLabel?: boolean;
}

export const ShareButton = ({ title, className, withLabel }: Props) => {
  const t = useTranslations();

  const onShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success(t('Link copied'));
    } catch {
      // foydalanuvchi ulashishni bekor qildi yoki clipboard ruxsat berilmadi — jim
    }
  };

  return (
    <button
      className={cn(
        withLabel
          ? 'bg-background text-foreground hover:bg-muted flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors'
          : 'bg-background/90 text-foreground flex size-8 items-center justify-center rounded-full shadow-sm',
        className
      )}
      aria-label={t('Share')}
      type='button'
      onClick={onShare}
    >
      <Share2Icon className='size-4' />
      {withLabel && t('Share')}
    </button>
  );
};
