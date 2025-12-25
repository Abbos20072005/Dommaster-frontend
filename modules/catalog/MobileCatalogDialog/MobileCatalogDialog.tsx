'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Link } from '@/i18n/navigation';
import { getCategories } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const MobileCatalogDialog = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<SubCategory | null>(null);

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const categories = getCategoriesQuery.data?.data.result;

  const goBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent className='flex h-dvh flex-col gap-0 p-0' hideCloseButton>
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
        <div className='flex-1 divide-y overflow-y-auto px-4'>
          {selectedCategory
            ? selectedSubCategory
              ? selectedSubCategory.product_item_categories.map((item) => (
                  <Link
                    href={`/category/${selectedCategory.id}/${selectedSubCategory.id}/${item.id}`}
                    key={item.id}
                    className='block py-3 text-sm'
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              : selectedCategory.sub_categories.map((item) => (
                  <button
                    key={item.id}
                    className='flex w-full py-3'
                    onClick={() => setSelectedSubCategory(item)}
                  >
                    <div className='flex flex-1 items-center gap-3 text-sm'>{item.name}</div>
                    <ChevronRightIcon className='text-muted-foreground' />
                  </button>
                ))
            : categories?.map((item) => (
                <button
                  key={item.id}
                  className='flex w-full py-3'
                  onClick={() => setSelectedCategory(item)}
                >
                  <div className='flex flex-1 items-center gap-3 text-sm'>
                    <Image
                      alt={item.name}
                      className='size-5 rounded-sm'
                      height={20}
                      src={item.icon}
                      width={20}
                    />
                    {item.name}
                  </div>
                  <ChevronRightIcon className='text-muted-foreground' />
                </button>
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
