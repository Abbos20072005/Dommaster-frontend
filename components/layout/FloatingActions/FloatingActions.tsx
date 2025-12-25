'use client';

import { MessageSquareTextIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ChatDialog } from '@/modules/chat';

export const FloatingActions = () => {
  return (
    <div className='fixed right-12 bottom-12 z-50 hidden items-center gap-2 md:flex md:flex-col'>
      <Button asChild className='rounded-full' size='icon' variant='outline'>
        <a href='https://t.me/buildexuz' rel='noreferrer' target='_blank'>
          <Image alt='telegram' height={40} src='/logos/telegram.png' width={40} />
        </a>
      </Button>
      <ChatDialog asChild>
        <Button className='rounded-full' size='iconLg' variant='secondary'>
          <MessageSquareTextIcon className='size-6' />
        </Button>
      </ChatDialog>
    </div>
  );
};
