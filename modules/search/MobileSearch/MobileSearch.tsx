'use client';

import { ArrowLeftIcon, SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React from 'react';

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
import { useMounted } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { useSearchHistoryStore } from '@/utils/stores';

import { SuggestionView } from '../components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const MobileSearch = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [searchValue] = useQueryState('q', { defaultValue: '' });
  const [searchInput, setSearchInput] = React.useState<string>('');
  const mounted = useMounted();
  const searchHistoryStore = useSearchHistoryStore();

  React.useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    searchHistoryStore.addSearchHistory(searchInput.trim());
    setOpen(false);
    router.push(`/search?q=${searchInput.trim()}`);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild {...props}>
        {children}
      </DialogTrigger>
      <DialogContent className='flex h-dvh flex-col gap-0 p-0 sm:max-w-full' hideCloseButton>
        <DialogHeader className='flex flex-row border-b p-2'>
          <DialogTitle className='sr-only'>{t('Search')}</DialogTitle>
          <DialogClose asChild>
            <Button size='iconSm' variant='ghost'>
              <ArrowLeftIcon className='size-5' />
            </Button>
          </DialogClose>
          <div className='relative flex flex-1'>
            <div className='absolute top-1/2 left-2 -translate-y-1/2'>
              <SearchIcon className='text-muted-foreground size-4.5' />
            </div>
            <Input
              ref={searchRef}
              className='bg-muted h-auto flex-1 border-none px-8 py-0 !ring-transparent'
              id='search'
              type='text'
              value={searchInput}
              autoComplete='off'
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(e)}
              placeholder='Саморез, электрика'
            />
            {mounted && searchInput && (
              <button
                className='absolute top-1/2 right-0.5 flex size-8 shrink-0 -translate-y-1/2 items-center justify-center rounded-e-md'
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
        </DialogHeader>
        <div className='flex-1 overflow-y-auto'>
          <SuggestionView
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onClose={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
