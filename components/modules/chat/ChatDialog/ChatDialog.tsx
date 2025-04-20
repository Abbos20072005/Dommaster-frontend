'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { MessageList } from '@/components/modules/chat/ChatDialog/components';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { postChatMessage } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const ChatDialog = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const queryClient = useQueryClient();
  const postChatMessageMutation = useMutation({
    mutationFn: postChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
      setMessage('');
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    postChatMessageMutation.mutate({
      data: { message: message.trim() }
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent
        className='flex h-dvh w-screen flex-col gap-0 p-0 sm:max-w-auto md:h-full md:max-h-[700px] md:w-[500px]'
        hideCloseButton
      >
        <DialogHeader className='hidden flex-row justify-between p-5 md:flex'>
          <DialogTitle>{t('Chat')}</DialogTitle>
          <DialogClose asChild>
            <button>
              <XIcon className='text-muted-foreground hover:text-primary size-5' />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className='flex items-center border-b md:hidden'>
          <div className='size-13' />
          <h1 className='flex-1 text-center font-bold lg:hidden'>{t('Chat')}</h1>
          <DialogClose asChild>
            <Button className='size-13' size='icon' variant='ghost'>
              <XIcon className='text-muted-foreground size-5' />
            </Button>
          </DialogClose>
        </div>
        <MessageList />
        <DialogFooter className='block w-full p-3'>
          <form className='flex items-center gap-2' onSubmit={onSubmit}>
            <Input
              className='flex-1'
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('Write a message')}
            />
            <Button
              disabled={postChatMessageMutation.isPending}
              size='icon'
              type='submit'
              variant='secondary'
            >
              {postChatMessageMutation.isPending ? <Spinner /> : <SendIcon />}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
