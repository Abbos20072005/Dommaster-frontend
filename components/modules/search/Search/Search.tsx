'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMounted, useOutsideClick } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useSearchHistoryStore } from '@/utils/stores';

import { SuggestionView } from '../components';

export const Search = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [searchValue] = useQueryState('q', { defaultValue: '' });
  const [searchInput, setSearchInput] = React.useState('');
  const mounted = useMounted();
  const searchHistoryStore = useSearchHistoryStore();
  const containerRef = useOutsideClick(() => setPopoverOpen(false));

  React.useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    searchHistoryStore.addSearchHistory(searchInput.trim());
    setPopoverOpen(false);
    router.push(`/search?q=${searchInput.trim()}`);
    searchRef.current?.blur();
  };

  return (
    <div ref={containerRef} className='relative flex-1'>
      <form className='bg-primary relative flex rounded-md' onSubmit={onSearch}>
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
      </form>
      <div
        className={cn(
          'bg-background invisible absolute inset-x-0 top-full z-50 w-full scale-96 rounded-md border-none p-0 opacity-0 shadow-lg transition-all',
          { 'visible scale-100 opacity-100': popoverOpen }
        )}
      >
        <SuggestionView
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onClose={() => setPopoverOpen(false)}
        />
      </div>
    </div>
  );
};
