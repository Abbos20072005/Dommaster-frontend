'use client';

import { useQuery } from '@tanstack/react-query';
import { differenceInDays, format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { getChatMessages } from '@/utils/api/requests';

export const MessageList = () => {
  const t = useTranslations();
  const getChatMessagesQuery = useQuery({
    queryKey: ['chat-messages'],
    queryFn: () => getChatMessages(),
    staleTime: 0
  });

  const messages = getChatMessagesQuery.data?.data.result;

  React.useEffect(() => {
    const chatMessageList = document.getElementById('chat-message-list');
    if (chatMessageList) {
      chatMessageList.scrollTop = chatMessageList.scrollHeight;
    }
  }, [getChatMessagesQuery.isSuccess, messages]);

  if (getChatMessagesQuery.isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <p>{t('Greetings')}!</p>
          <p className='text-muted-foreground'>{t('Tell us who you are or ask your question')}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto px-3' id='chat-message-list'>
      <ul className='space-y-4'>
        {messages?.map((message, index) => (
          <React.Fragment key={message.id}>
            <li className={cn('flex items-end gap-1.5', !message.is_answer && 'justify-end')}>
              {message.is_answer && (
                <Image
                  alt='avatar'
                  className='bg-muted size-7 rounded-sm object-contain p-1'
                  height={28}
                  src='/logo.png'
                  width={28}
                />
              )}
              <div
                className={cn(
                  'w-fit max-w-[80%] rounded-lg px-5 py-2',
                  message.is_answer ? 'bg-muted rounded-bl-none' : 'bg-muted rounded-br-none'
                )}
              >
                <p className='text-sm'>{message.message}</p>
                <p className='text-muted-foreground mt-1 text-end text-xs'>
                  {format(message.created_at, 'HH:mm')}
                </p>
              </div>
            </li>
            {messages.length > index + 1 &&
            differenceInDays(message.created_at, messages[index + 1].created_at) ? (
              <li className='flex items-center justify-center'>
                <Badge variant='outline'>{format(message.created_at, 'dd.MM')}</Badge>
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
