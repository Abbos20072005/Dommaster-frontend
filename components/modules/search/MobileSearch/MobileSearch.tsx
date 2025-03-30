import { ArrowLeftIcon, SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const MobileSearch = () => {
  const t = useTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='bg-background text-muted-foreground w-full justify-start'
          variant='outline'
        >
          <SearchIcon />
          Саморез, доставка
        </Button>
      </DialogTrigger>
      <DialogContent className='block h-svh p-0' hideCloseButton>
        <DialogHeader className='flex flex-row border-b p-2'>
          <DialogTitle className='sr-only'>Search</DialogTitle>
          <DialogClose asChild>
            <Button size='iconSm' variant='ghost'>
              <ArrowLeftIcon className='size-5' />
            </Button>
          </DialogClose>
          <Input
            className='h-auto flex-1 border-none py-0 !ring-transparent'
            placeholder='Саморез, доставка'
          />
          <Button size='sm'>{t('Search')}</Button>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};
