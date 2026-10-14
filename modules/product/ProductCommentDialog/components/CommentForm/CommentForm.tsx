'use client';

import { CloudUpload, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Ratings } from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';

import { useCommentForm } from './hooks';

interface Props {
  defaultValues?: ProductComment;
  onSuccess?: (data: ProductCommentResponse) => void;
  productId?: number;
}

export const CommentForm = ({ onSuccess, defaultValues, productId }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useCommentForm({ onSuccess, defaultValues, productId });

  return (
    <Form {...form}>
      <form className='min-w-0 space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel className='font-bold'>{t('Please rate this product overall')}</FormLabel>
              <div className='flex items-center gap-3'>
                <FormControl>
                  <Ratings
                    rating={field.value}
                    classNameIcon='text-secondary'
                    onChange={field.onChange}
                  />
                </FormControl>
                {!!field.value && (
                  <span className='text-[15px] leading-[22px] font-bold'>
                    {t(`Rating word ${field.value}`)}
                  </span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
          name='product_rating'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <div className='flex items-center justify-between'>
                <FormLabel className='font-bold'>{t('Comment')}</FormLabel>
                <span className='text-muted-foreground text-[13px] tabular-nums'>
                  {field.value?.length ?? 0} / 2000
                </span>
              </div>
              <FormControl>
                <Textarea
                  maxLength={2000}
                  placeholder={t('Write your comment')}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='comment'
          control={form.control}
        />
        {!defaultValues && (
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Images')}</FormLabel>
                <FormControl>
                  <FileUpload
                    multiple
                    accept='image/*'
                    maxFiles={5}
                    maxSize={5 * 1024 * 1024}
                    value={field.value}
                    onFileReject={(_, message) => {
                      form.setError('images', {
                        message
                      });
                    }}
                    onValueChange={field.onChange}
                  >
                    <FileUploadDropzone className='flex-row flex-wrap border-dotted text-center'>
                      <CloudUpload className='size-4' />
                      {t('Drag and drop or choose files to upload')}
                    </FileUploadDropzone>

                    {/* Custom file list rendering */}
                    <FileUploadList>
                      {field.value.map((file, index) => (
                        <FileUploadItem key={index} value={file}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button className='size-7' size='icon' variant='ghost'>
                              <XIcon />
                              <span className='sr-only'>{t('Delete')}</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormDescription>{t('Upload up to 5 images up to 5MB each')}.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            name='images'
            control={form.control}
          />
        )}
        <div className='flex justify-end gap-3 pt-2'>
          <DialogClose asChild>
            <Button className='h-11 px-5' type='button' variant='muted'>
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button className='h-11 px-6' isLoading={state.isPending}>
            {t('Send')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
