'use client';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
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
import { LOCALE_LABELS, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { COOKIES } from '@/utils/constants';

interface Props {
  className?: string;
}

// Navbar'dagi til tanlagich: Русский / Oʻzbekcha
export const LocaleSwitcher = ({ className }: Props) => {
  const t = useTranslations();
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const onLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) return;

    // The language is in the address (`/uz/...`): the same page is opened in the other language
    // (a slug of the other language is redirected to its own by the page). The cookie keeps the
    // choice for the next visit to `/`.
    Cookies.set(COOKIES.LOCALE, locale, { expires: 365, path: '/', sameSite: 'lax' });
    startTransition(() => {
      router.replace(`${pathname}${window.location.search}`, { locale });
    });
    queryClient.invalidateQueries();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'hover:text-primary flex items-center gap-1 text-sm transition-colors outline-none',
          isPending && 'pointer-events-none opacity-50',
          className
        )}
        aria-label={t('Language')}
        disabled={isPending}
      >
        <LanguagesIcon className='size-4' />
        <span className='font-medium'>{LOCALE_LABELS[currentLocale].short}</span>
        <ChevronDownIcon className='size-3.5' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className='justify-between gap-4'
            onClick={() => onLocaleChange(locale)}
          >
            {LOCALE_LABELS[locale].full}
            {currentLocale === locale && <CheckIcon className='text-primary' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
