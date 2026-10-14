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
      <DialogContent
        className='block h-dvh overflow-y-auto p-0 sm:h-auto sm:max-h-[92dvh] sm:rounded-xl'
        style={{ maxWidth: 'min(56rem, 100%)' }}
      >
        <DialogHeader className='px-4 pt-5 sm:px-6'>
          <DialogTitle className='text-xl leading-[26px] font-bold'>
            {defaultValues ? t('Edit address') : t('New address')}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-2 pt-4'>
          <AddressForm defaultValues={defaultValues} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
