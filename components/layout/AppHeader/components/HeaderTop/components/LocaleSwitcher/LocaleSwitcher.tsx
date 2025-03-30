'use client';

import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useTransition } from 'react';

import type { Locale } from '@/i18n/routing';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onLocaleChange = (locale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'hover:text-secondary flex items-center gap-1 text-sm transition-colors outline-none',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
      >
        <LanguagesIcon className='size-4' />
        <span>{currentLocale[0].toUpperCase() + currentLocale.slice(1)}</span>
        <ChevronDownIcon className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className='justify-between'
            onClick={() => onLocaleChange(locale)}
          >
            {locale[0].toUpperCase() + locale.slice(1)}
            {currentLocale === locale && <CheckIcon />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
