'use client';

import type { Locale as DateFnsLocale } from 'date-fns';

import { format } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import React from 'react';

import type { Locale } from '@/i18n/routing';

export const DATE_FNS_LOCALES: Record<Locale, DateFnsLocale> = { ru, uz };

// Sanani joriy tilda formatlaydi (oy nomlari: "30 сентября" / "30 Sentabr")
export const useFormatDate = () => {
  const locale = useLocale() as Locale;

  return React.useCallback(
    (date: number | string | Date, pattern: string) =>
      format(date, pattern, { locale: DATE_FNS_LOCALES[locale] ?? ru }),
    [locale]
  );
};
