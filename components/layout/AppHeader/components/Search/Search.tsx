import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';

import { SuggestionView } from './SuggestionView';

export const Search = () => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <form className='flex-1'>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverAnchor asChild>
          <div className='flex'>
            <Input
              className='border-primary flex-1 rounded-e-none border-2 !ring-transparent'
              id='search'
              type='search'
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder='Саморез'
            />
            <Button className='rounded-s-none px-3 lg:px-4'>
              <span className='lg:hidden'>
                <SearchIcon className='size-5' />
              </span>
              <span className='hidden lg:inline'>{t('Search')}</span>
            </Button>
          </div>
        </PopoverAnchor>
        <PopoverContent
          align='start'
          className='w-[770px] border-none p-0 shadow-lg'
          onInteractOutside={(e) => {
            if (
              e.target instanceof Element &&
              document.getElementById('search')?.contains(e.target)
            ) {
              e.preventDefault();
            }
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SuggestionView searchValue={searchValue} />
        </PopoverContent>
      </Popover>
    </form>
  );
};
