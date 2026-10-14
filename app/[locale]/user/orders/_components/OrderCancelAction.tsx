'use client';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { postOrderCancel } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof AlertDialogTrigger> {
  children: React.ReactNode;
  orderId: number;
}

/** "Cancel order": a confirmation that says what happens to the goods and the money. */
export const OrderCancelAction = ({ orderId, children, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const postOrderCancelMutation = useMutation({
    mutationFn: postOrderCancel,
    onSuccess: () => {
      toast.success(t('Order canceled'));
      if (pathname !== '/user/orders/active') router.push('/user/orders/active');
      setOpen(false);
    },
    meta: {
      invalidatesQuery: ['orders']
    }
  });

  const onCancelOrder = () => {
    postOrderCancelMutation.mutate({ id: orderId });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger {...props}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
            {t('Cancel order question', { id: orderId })}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
            {t('Cancel order text')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='h-11 px-5'>{t('Keep order')}</AlertDialogCancel>
          <Button
            className='h-11 px-5'
            variant='destructive'
            isLoading={postOrderCancelMutation.isPending}
            onClick={onCancelOrder}
          >
            {t('Cancel order')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
