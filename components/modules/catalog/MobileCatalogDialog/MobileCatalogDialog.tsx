'use client';

import { ArrowLeftIcon, AxeIcon, ChevronRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { MobileSearch } from '@/components/modules/search';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { categoryData } from '@/fake-data/category';
import { Link } from '@/i18n/navigation';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const MobileCatalogDialog = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const [history, setHistory] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState(false);

  const catalog = history.reduce((acc, index) => acc[index]?.children || [], categoryData);

  const onEnter = (catalogIndex: number) => {
    setHistory([...history, catalogIndex]);
  };

  const goBack = () => {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent className='flex h-svh flex-col gap-0 p-0' hideCloseButton>
        <DialogTitle className='sr-only'>{t('Catalog')}</DialogTitle>
        <div className='flex items-center border-b md:hidden'>
          <Button className='size-13' size='icon' variant='ghost' onClick={goBack}>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Button>
          <h1 className='flex-1 text-center font-bold lg:hidden'>{t('Catalog')}</h1>
          <DialogClose asChild>
            <Button className='size-13' size='icon' variant='ghost'>
              <XIcon className='text-muted-foreground size-5' />
            </Button>
          </DialogClose>
        </div>
        <div className='flex-1 overflow-y-auto p-4'>
          <MobileSearch>
            <Button
              className='bg-background text-muted-foreground mb-4 w-full justify-start md:hidden'
              variant='outline'
            >
              <SearchIcon />
              Саморез, доставка
            </Button>
          </MobileSearch>
          {catalog.map((item, index) =>
            item.children.length ? (
              <button
                key={item.id}
                className='flex w-full border-t py-3'
                onClick={() => onEnter(index)}
              >
                <div className='flex flex-1 items-center gap-3 text-sm'>
                  {!history.length && <AxeIcon className='text-primary size-6' />}
                  {item.title}
                </div>
                <ChevronRightIcon className='text-muted-foreground' />
              </button>
            ) : (
              <Link
                href={`/category/${item.id}`}
                key={item.id}
                className='block border-t py-3 text-sm'
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
