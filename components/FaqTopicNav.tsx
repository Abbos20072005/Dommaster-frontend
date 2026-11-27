'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  topics: { id: number | string; slug: string; name: string }[];
  /** the list of the topics (rendered on the server: all the questions stay in the HTML) */
  children: React.ReactNode;
}

/**
 * The chips of the topics over the list: a click on a chip leaves only the questions of that topic,
 * a second click on it shows all of them again. The questions stay in the page HTML for the search
 * engines; the other topics are only hidden in the browser.
 */
export const FaqTopicNav = ({ topics, children }: Props) => {
  const t = useTranslations();
  const [active, setActive] = React.useState<string | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.querySelectorAll<HTMLElement>(':scope > div > section[id]').forEach((section) => {
      section.hidden = active !== null && section.id !== active;
    });
  }, [active]);

  return (
    <>
      <nav aria-label={t('FAQ topics')} className='flex flex-wrap gap-2'>
        {topics.map((topic) => {
          const selected = active === topic.slug;
          return (
            <button
              aria-pressed={selected}
              className={cn(
                'hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                selected ? 'border-primary bg-primary hover:text-white text-white' : 'border-border'
              )}
              key={topic.slug}
              type='button'
              onClick={() => setActive(selected ? null : topic.slug)}
            >
              {topic.name}
            </button>
          );
        })}
      </nav>
      <div ref={listRef}>{children}</div>
    </>
  );
};
