'use client';
import { useMutation } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
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

export const OrderCancelAction = ({ orderId, children, ...props }: Props) => {
  const t = useTranslations();
  const [_, setOpenDelete] = React.useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const postOrderCancelMutation = useMutation({
    mutationFn: postOrderCancel,
    onSuccess: () => {
      toast.success(t('Order canceled'));
      if (pathname !== '/user/orders/active') router.push('/user/orders/active');
      setOpenDelete(false);
    },
    meta: {
      invalidatesQuery: ['orders']
    }
  });

  const onCancelOrder = () => {
    postOrderCancelMutation.mutate({ id: orderId });
  };

  return (
    <AlertDialog onOpenChange={setOpenDelete}>
      <AlertDialogTrigger {...props}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='bg-destructive/15 rounded-xl p-2'>
            <XIcon className='text-destructive size-8' />
          </div>
          <AlertDialogTitle>{t('Cancel order')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
          <Button
            size='sm'
            variant='destructive'
            isLoading={postOrderCancelMutation.isPending}
            onClick={onCancelOrder}
          >
            {t('Delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
