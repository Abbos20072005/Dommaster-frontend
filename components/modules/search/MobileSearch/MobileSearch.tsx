'use client';

import { ArrowLeftIcon, XIcon } from 'lucide-react';
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

import { SuggestionView } from './components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
}

export const MobileSearch = ({ children, ...props }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useQueryState('q', { defaultValue: '' });
  const [searchInput, setSearchInput] = React.useState<string>('');
  const mounted = useMounted();

  React.useEffect(() => {
    if (searchValue) setSearchInput(searchValue);
  }, []);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search?q=${searchInput.trim()}`);
    setSearchValue(searchInput.trim());
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild {...props}>
        {children}
      </DialogTrigger>
      <DialogContent className='flex h-svh flex-col gap-0 p-0' hideCloseButton>
        <DialogHeader className='flex flex-row border-b p-2'>
          <DialogTitle className='sr-only'>Search</DialogTitle>
          <DialogClose asChild>
            <Button size='iconSm' variant='ghost'>
              <ArrowLeftIcon className='size-5' />
            </Button>
          </DialogClose>
          <div className='flex flex-1'>
            <Input
              ref={searchRef}
              className='h-auto flex-1 border-none py-0 !ring-transparent'
              id='search'
              type='text'
              value={searchInput}
              autoComplete='off'
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Саморез, доставка'
            />
            {mounted && searchInput && (
              <button
                className='flex size-8 shrink-0 items-center justify-center rounded-e-md'
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
