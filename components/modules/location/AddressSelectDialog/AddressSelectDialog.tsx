import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { AddressForm } from './components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  defaultValues?: Address;
}

export const AddressSelectDialog = ({ defaultValues, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props} />
      <DialogContent className='block h-dvh px-0 pb-0 sm:h-auto sm:max-w-3xl sm:rounded-xl sm:px-5 sm:pb-5'>
        <DialogHeader>
          <DialogTitle>{t('Select address')}</DialogTitle>
        </DialogHeader>
        <div className='space-y-2 pt-4'>
          <AddressForm defaultValues={defaultValues} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
