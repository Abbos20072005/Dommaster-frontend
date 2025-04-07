'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { useMounted } from '@/hooks';
import { useRouter } from '@/i18n/navigation';

import { SuggestionView } from './SuggestionView';

export const Search = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useQueryState('q', { defaultValue: '' });
  const [searchInput, setSearchInput] = React.useState('');
  const mounted = useMounted();

  React.useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search?q=${searchInput.trim()}`);
    setSearchValue(searchInput.trim());
    setPopoverOpen(false);
  };

  return (
    <form className='flex-1' onSubmit={onSearch}>
      <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
        <PopoverAnchor asChild>
          <div className='bg-primary relative flex rounded-md'>
            <div className='border-primary bg-background flex flex-1 rounded-md border-2'>
              <Input
                ref={searchRef}
                className='h-10 flex-1 border-none !ring-transparent ring-offset-transparent'
                id='search'
                type='text'
                value={searchInput}
                autoComplete='off'
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setPopoverOpen(true)}
                placeholder='Саморез'
              />
              {mounted && searchInput && (
                <button
                  className='flex size-10 shrink-0 items-center justify-center rounded-e-md'
                  type='button'
                  onClick={() => {
                    setSearchInput('');
                    searchRef.current?.focus();
                  }}
                >
                  <XIcon className='size-5' />
                </button>
              )}
            </div>
            <Button className='rounded-s-none px-3 shadow-none lg:px-4' type='submit'>
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
            )
              e.preventDefault();
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SuggestionView
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onClose={() => setPopoverOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </form>
  );
};
