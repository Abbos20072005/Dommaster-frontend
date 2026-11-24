'use client';

import { trackEvent } from '@/lib/analytics';

interface Props {
  /** the cleaned HTML of the answer (the server has already localized its links) */
  html: string;
  id: number;
  locale: string;
  question: string;
  topic: string;
}

/**
 * One question: a `<details>` whose answer is in the HTML of the page even when it is closed (the
 * search engines read it). Opening it tells the analytics which question, in which topic and language.
 */
export const FaqQuestionItem = ({ html, id, locale, question, topic }: Props) => (
  <details
    className='border-border group rounded-xl border px-4 py-3 text-[15px] leading-7'
    onToggle={(event) => {
      if (event.currentTarget.open) {
        trackEvent('faq_question_open', { question_id: id, topic, language: locale });
      }
    }}
  >
    <summary className='cursor-pointer font-semibold'>{question}</summary>
    <div
      className='prose prose-sm text-muted-foreground [&_a]:text-primary mt-2 max-w-max [&_a]:underline'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </details>
);
