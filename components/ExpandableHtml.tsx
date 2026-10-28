'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

/** A text longer than this (without tags) is folded; shorter ones are shown whole. */
const FOLD_FROM = 280;

interface Props {
  /** already sanitized (see `sanitizeHtml`) */
  html: string;
}

/**
 * A text in the page style. A long one shows its first lines, the rest opens with "Read more":
 * the text stays in the HTML (it is only hidden by the height), so the crawler reads all of it.
 */
export const ExpandableHtml = ({ html }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const foldable = html.replace(/<[^>]*>/g, '').length > FOLD_FROM;

  return (
    <section className='mt-8 border-t pt-6'>
      <div className={cn('relative', foldable && !open && 'max-h-28 overflow-hidden')}>
        <div
          className='prose prose-sm md:prose-base max-w-none'
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {foldable && !open && (
          <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent' />
        )}
      </div>
      {foldable && (
        <button
          aria-expanded={open}
          className='text-primary mt-2 cursor-pointer text-sm font-semibold hover:underline'
          type='button'
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t('Collapse') : t('Read more')}
        </button>
      )}
    </section>
  );
};
