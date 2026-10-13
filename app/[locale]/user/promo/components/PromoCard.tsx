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
}

const localeMap = { en: undefined, uz, ru };

/** A promo code: the discount, what it needs, the code with "Copy" and "Apply in cart". */
export const PromoCard = ({ promo, expired }: PromoCardProps) => {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [copied, setCopied] = useState(false);

  const endDate = parseISO(promo.expires_at);
  const daysLeft = differenceInCalendarDays(endDate, new Date());
  const soon = !expired && daysLeft <= 3;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className='border-border grid content-start gap-4 rounded-xl border bg-white p-5'>
      <div className='flex items-start justify-between gap-3'>
        <span
          className={cn(
            'text-[30px] leading-9 font-bold tracking-tight tabular-nums',
            expired && 'text-[#9AA4B2] line-through decoration-2'
          )}
        >
          −{promo.discount_precent}%
        </span>
        {expired ? (
          <span className='inline-flex h-[26px] items-center rounded-full bg-[#EDF0F5] px-2.5 text-xs font-bold whitespace-nowrap text-[#4A5563]'>
            {t('Promo expired')}
          </span>
        ) : (
          soon && (
            <span className='inline-flex h-[26px] items-center gap-1.5 rounded-full bg-[#FFF7E5] px-2.5 text-xs font-bold whitespace-nowrap text-[#8A6200]'>
              <ClockIcon className='size-3.5' />
              {t('Expires in {count} d', { count: Math.max(daysLeft, 0) })}
            </span>
          )
        )}
      </div>

      <div className='grid gap-1.5 text-sm leading-5'>
        <div className='grid grid-cols-[140px_minmax(0,1fr)] gap-3'>
          <span className='text-muted-foreground'>{t('Promo discount')}</span>
          <span>{promo.name}</span>
        </div>
        <div className='grid grid-cols-[140px_minmax(0,1fr)] gap-3'>
          <span className='text-muted-foreground'>{t('Promo valid until')}</span>
          <span>{format(endDate, 'd MMMM yyyy', { locale: localeMap[locale] })}</span>
        </div>
      </div>

      <div className='flex gap-2'>
        <div
          className={cn(
            'flex h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border-[1.5px] border-dashed bg-muted pr-1 pl-3.5',
            expired ? 'border-[#CBD2DB]' : 'border-[#9AA4B2]'
          )}
        >
          <span
            className={cn(
              'truncate font-mono text-base font-bold tracking-[0.06em]',
              expired && 'text-[#6B7685]'
            )}
          >
            {promo.code}
          </span>
          {!expired &&
            (copied ? (
              <span
                className='inline-flex h-9 items-center gap-1.5 px-2.5 text-[13px] font-bold text-[#0E7C3E]'
                role='status'
              >
                <CheckIcon className='size-[18px]' strokeWidth={2.4} />
                {t('Copied')}
              </span>
            ) : (
              <button
                aria-label={t('Copy')}
                className='text-primary hover:bg-primary/5 inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-bold'
                type='button'
                onClick={copyToClipboard}
              >
                <CopyIcon className='size-[18px]' />
                {t('Copy')}
              </button>
            ))}
        </div>
        {!expired && (
          <Link
            href='/cart'
            className='bg-primary hover:bg-primary/90 inline-flex h-11 shrink-0 items-center rounded-lg px-4 text-sm font-bold text-white'
          >
            {t('Apply in cart')}
          </Link>
        )}
      </div>
    </article>
  );
};
