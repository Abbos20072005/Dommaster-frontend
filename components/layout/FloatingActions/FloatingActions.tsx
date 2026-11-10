'use client';

import { MessageSquareTextIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ChatDialog } from '@/modules/chat';
import { SOCIAL_LINKS } from '@/utils/constants';

export const FloatingActions = () => {
  const t = useTranslations();

  return (
    // above the AI assistant button (bottom right, 24px from the edges)
    <div className='fixed right-6 bottom-24 z-50 hidden items-center gap-2 md:flex md:flex-col'>
      <Button asChild className='rounded-full' size='icon' variant='outline'>
        <a aria-label='Telegram' href={SOCIAL_LINKS.telegram} rel='noreferrer' target='_blank'>
          <Image alt='' height={40} src='/logos/telegram.png' width={40} />
        </a>
      </Button>
      <ChatDialog asChild>
        <Button aria-label={t('Chat')} className='rounded-full' size='iconLg' variant='secondary'>
          <MessageSquareTextIcon className='size-6' />
        </Button>
      </ChatDialog>
    </div>
  );
};
