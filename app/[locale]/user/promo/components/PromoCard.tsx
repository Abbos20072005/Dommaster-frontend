'use client';

import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { CheckIcon, ClockIcon, CopyIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import type { Locale } from '@/i18n/routing';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface PromoCardProps {
  promo: Promo;
  /** past promo codes: a struck-out discount and no "Apply" button */
  expired?: boolean;
  /** just saved from the field above */
  isNew?: boolean;
}

const localeMap = { en: undefined, uz, ru };

/** A promo code: the discount, what it needs, the code with "Copy" and "Apply in cart". */
export const PromoCard = ({ promo, expired, isNew }: PromoCardProps) => {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [copied, setCopied] = useState(false);

  const endDate = parseISO(promo.expires_at);
  const daysLeft = Math.max(differenceInCalendarDays(endDate, new Date()), 0);
  const soon = !expired && daysLeft < 7;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article
      className={cn(
        'border-border grid content-start gap-4 rounded-2xl border bg-white p-4 md:rounded-xl md:p-5',
        isNew && 'border-primary ring-primary/20 ring-2'
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <span
          className={cn(
            'text-[26px] leading-8 font-bold tracking-tight tabular-nums md:text-[30px] md:leading-9',
            expired && 'text-[#9AA4B2] line-through decoration-2'
          )}
        >
          −{promo.discount_precent}%
        </span>
        <span className='flex flex-wrap justify-end gap-1.5'>
          {isNew && !expired && (
            <span className='bg-primary/10 inline-flex h-[26px] items-center rounded-full px-2.5 text-xs font-bold whitespace-nowrap text-[#0039A3]'>
              {t('New promo')}
            </span>
          )}
          {expired && (
            <span className='inline-flex h-[26px] items-center rounded-full bg-[#EDF0F5] px-2.5 text-xs font-bold whitespace-nowrap text-[#4A5563]'>
              {t('Promo expired')}
            </span>
          )}
          {soon && (
            <span className='inline-flex h-[26px] items-center gap-1.5 rounded-full bg-[#FFF7E5] px-2.5 text-xs font-bold whitespace-nowrap text-[#8A6200]'>
              <ClockIcon className='size-3.5' />
              {t('Promo days left', { count: daysLeft })}
            </span>
          )}
        </span>
      </div>

      <div className='grid gap-1.5 text-sm leading-5'>
        <div className='grid grid-cols-[128px_minmax(0,1fr)] gap-3 md:grid-cols-[140px_minmax(0,1fr)]'>
          <span className='text-muted-foreground'>{t('Promo discount')}</span>
          <span>{promo.name}</span>
        </div>
        <div className='grid grid-cols-[128px_minmax(0,1fr)] gap-3 md:grid-cols-[140px_minmax(0,1fr)]'>
          <span className='text-muted-foreground'>{t('Promo valid until short')}</span>
          <span>
            {t('Promo until', {
              date: format(endDate, 'd MMMM yyyy', { locale: localeMap[locale] })
            })}
          </span>
        </div>
      </div>

      {expired ? (
        <span className='font-mono text-[15px] leading-5 font-bold tracking-[0.06em] text-[#6B7685]'>
          {promo.code}
        </span>
      ) : (
        <div className='grid gap-2 md:flex'>
          <div className='bg-muted flex h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border-[1.5px] border-dashed border-[#9AA4B2] pr-1 pl-3.5 md:h-11'>
            <span className='truncate font-mono text-base leading-5 font-bold tracking-[0.06em]'>
              {promo.code}
            </span>
            {copied ? (
              <span
                className='inline-flex h-10 shrink-0 items-center gap-1.5 px-2.5 text-[13px] font-bold text-[#0E7C3E]'
                role='status'
              >
                <CheckIcon className='size-[18px]' strokeWidth={2.4} />
                {t('Copied')}
              </span>
            ) : (
              <button
                aria-label={t('Copy')}
                className='text-primary hover:bg-primary/5 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-bold'
                type='button'
                onClick={copyToClipboard}
              >
                <CopyIcon className='size-[18px]' />
                {t('Copy')}
              </button>
            )}
          </div>
          <Link
            href='/cart'
            className='bg-primary hover:bg-primary/90 inline-flex h-12 shrink-0 items-center justify-center rounded-lg px-[18px] text-[15px] font-bold text-white md:h-11 md:text-sm'
          >
            {t('Apply in cart')}
          </Link>
        </div>
      )}
    </article>
  );
};
