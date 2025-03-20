'use client';

import { ChevronDownIcon, MapPinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import type { Button } from '@/components/ui/button';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

const cities = [
  {
    id: 1,
    title: 'Toshkent'
  },
  {
    id: 2,
    title: 'Samarqand'
  }
];

type Props = React.ComponentProps<typeof Button>;

export const Location = ({ ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState({
    id: 1,
    title: 'Toshkent'
  });

  return (
    <>
      <button
        className='hover:text-primary flex items-center gap-1 text-sm transition-colors'
        onClick={() => setOpen(true)}
        {...props}
      >
        <MapPinIcon className='size-4' />
        <span className='hidden sm:inline-block'>{location.title}</span>
        <ChevronDownIcon className='size-4' />
      </button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder={t('Search cities')} />
        <CommandList>
          <CommandEmpty>{t('No results found')}.</CommandEmpty>
          <CommandGroup>
            {cities.map((item) => (
              <CommandItem
                key={item.id}
                value={item.title}
                onSelect={() => {
                  setLocation(item);
                  setOpen(false);
                }}
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
