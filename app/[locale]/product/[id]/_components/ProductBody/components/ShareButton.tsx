'use client';

import {
  CopyIcon,
  FacebookIcon,
  MailIcon,
  MessageCircleIcon,
  SendIcon,
  Share2Icon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  className?: string;
  /** matnli (kengroq) tugma */
  withLabel?: boolean;
}

export const ShareButton = ({ title, className, withLabel }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const onOpen = () => {
    setUrl(window.location.href);
    setOpen(true);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('Link copied'));
    } catch {
      // clipboard ruxsat berilmadi — jim
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const targets = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircleIcon,
      color: 'bg-[#25D366]'
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
      color: 'bg-[#1877F2]'
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: SendIcon,
      color: 'bg-[#229ED9]'
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: MailIcon,
      color: 'bg-[#7B7B7B]'
    }
  ];

  return (
    <>
      <button
        className={cn(
          withLabel
            ? 'bg-background text-foreground hover:bg-muted flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors'
            : 'bg-background/90 text-foreground flex size-8 items-center justify-center rounded-full shadow-sm',
          className
        )}
        aria-label={t('Share')}
        type='button'
        onClick={onOpen}
      >
        <Share2Icon className='size-4' />
        {withLabel && t('Share')}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[calc(100%-2rem)] rounded-2xl sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>{t('Send')}</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-4 gap-2'>
            {targets.map(({ name, href, icon: Icon, color }) => (
              <a
                className='flex flex-col items-center gap-2 text-xs font-medium sm:text-sm'
                href={href}
                key={name}
                rel='noopener noreferrer'
                target='_blank'
              >
                <span className='bg-muted flex size-14 items-center justify-center rounded-xl sm:size-16'>
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full text-white',
                      color
                    )}
                  >
                    <Icon className='size-5' />
                  </span>
                </span>
                {name}
              </a>
            ))}
          </div>
          <div className='space-y-2'>
            <div className='text-sm font-medium'>{t('Copy link')}</div>
            <button
              className='bg-muted hover:bg-muted/70 flex h-12 w-full items-center gap-2 rounded-xl px-3 text-left text-sm transition-colors'
              type='button'
              onClick={onCopy}
            >
              <span className='min-w-0 flex-1 truncate'>{url}</span>
              <CopyIcon className='text-muted-foreground size-4 shrink-0' />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
