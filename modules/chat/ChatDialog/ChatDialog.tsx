'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

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
import {
  FileUpload,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger
} from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { MessageList } from '@/modules/chat/ChatDialog/components';
import { postChatMessage } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const ChatDialog = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [image, setImage] = React.useState<File>();

  const queryClient = useQueryClient();
  const postChatMessageMutation = useMutation({
    mutationFn: postChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
      setMessage('');
      setImage(undefined);
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() && !image) return;
    const fd = new FormData();
    if (image) fd.append('image', image);
    if (message.trim()) fd.append('message', message);

    postChatMessageMutation.mutate({ data: fd });
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
        <DialogFooter className='block space-y-2 p-3'>
          <FileUpload
            accept='image/png,image/jpeg,image/jpg,image/webp'
            maxSize={5 * 1024 * 1024}
            multiple={false}
            value={image && [image]}
            onFileReject={(_, message) => toast(message)}
            onValueChange={(files) => setImage(files[files.length - 1])}
          >
            <FileUploadList>
              {image && (
                <FileUploadItem className='px-2 py-1.5' value={image}>
                  <FileUploadItemPreview className='size-10 [&>svg]:size-5'>
                    <FileUploadItemProgress variant='fill' />
                  </FileUploadItemPreview>
                  <FileUploadItemMetadata size='sm' />
                  <FileUploadItemDelete asChild>
                    <Button
                      className='absolute -top-1 -right-1 size-4 shrink-0 cursor-pointer rounded-full'
                      size='icon'
                      variant='secondary'
                    >
                      <XIcon className='size-2.5' />
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              )}
            </FileUploadList>
            <form className='flex items-center gap-2' onSubmit={onSubmit}>
              <FileUploadTrigger asChild>
                <Button
                  disabled={postChatMessageMutation.isPending}
                  size='icon'
                  type='button'
                  variant='outline'
                >
                  <ImageIcon />
                </Button>
              </FileUploadTrigger>
              <Input
                className='flex-1'
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('Write a message')}
              />
              <Button
                disabled={!message.trim() && !image}
                size='icon'
                type='submit'
                variant='secondary'
                isLoading={postChatMessageMutation.isPending}
              >
                <SendIcon />
              </Button>
            </form>
          </FileUpload>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
