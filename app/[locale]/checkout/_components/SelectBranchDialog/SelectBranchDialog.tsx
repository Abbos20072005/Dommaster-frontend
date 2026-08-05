import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { BranchList } from './components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {}

export const SelectBranchDialog = (props: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Branches')}</DialogTitle>
        </DialogHeader>
        <BranchList onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
