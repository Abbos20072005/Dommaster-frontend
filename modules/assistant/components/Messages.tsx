'use client';

import { ChevronRightIcon, CircleAlertIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import type { AssistantMessage } from '../types';

import { AssistantMark } from './AssistantMark';
import { FormattedText } from './FormattedText';
import { CheckNote, OperatorCard, OperatorLink, PiiNotice, SourceChip } from './Notices';
import { ProductMiniCard } from './ProductMiniCard';

const formatTime = (iso: string) => {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, '0');

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** A quick answer under a message: a thin outlined pill. */
export const Chip = ({
  children,
  onClick,
  active
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) => (
  <button
    className={cn(
      'rounded-full border px-3.5 py-2 text-sm leading-5 font-medium transition-colors',
      active
        ? 'border-primary bg-[#EAF1FF] text-primary'
        : 'hover:border-primary hover:text-primary border-[#E5E8EC] bg-white text-[#0F1620]'
    )}
    type='button'
    onClick={onClick}
  >
    {children}
  </button>
);

/** A new answer is written out letter by letter (about a second at most), with a blinking caret. */
const useTypewriter = (text: string, enabled: boolean, onStep?: () => void) => {
  const [count, setCount] = React.useState(enabled ? 0 : text.length);

  React.useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }

    setCount(0);
    const step = Math.max(1, Math.ceil(text.length / 70));
    const timer = setInterval(() => {
      setCount((current) => {
        const next = Math.min(text.length, current + step);
        if (next >= text.length) clearInterval(timer);
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [text, enabled]);

  React.useEffect(() => {
    onStep?.();
  }, [count, onStep]);

  return text.slice(0, count);
};

const Avatar = () => <AssistantMark className='text-primary mt-2.5 size-5' />;

const UserMessage = ({ message }: { message: AssistantMessage }) => {
  const t = useTranslations();

  return (
    <div className='flex flex-col items-end gap-1'>
      <div className='flex max-w-[88%] items-center gap-2'>
        {message.failed && <CircleAlertIcon className='size-[18px] shrink-0 fill-[#D92D20] text-white' />}
        <div className='bg-primary rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm leading-5 break-words whitespace-pre-wrap text-white'>
          {message.text}
        </div>
      </div>
      {message.failed ? (
        <span className='text-[11px] leading-4 font-medium text-[#B42318]'>
          {t('assistant.notSent')}
        </span>
      ) : (
        <span className='text-[11px] leading-4 text-[#6B7685]'>{formatTime(message.time)}</span>
      )}
    </div>
  );
};

/** Thumbs under an answer (optional); a thumbs-down asks why with a row of chips. */
const Rating = ({
  message,
  onRate,
  onReason
}: {
  message: AssistantMessage;
  onRate: (rating: 'down' | 'up') => void;
  onReason: (reason: string) => void;
}) => {
  const t = useTranslations();
  const rated = !!message.rating;
  const reasons = ['assistant.reasonWrong', 'assistant.reasonUnclear', 'assistant.reasonOther'];

  return (
    <div className='grid gap-2'>
      <div className='flex items-center gap-1'>
        {(['up', 'down'] as const).map((rating) => {
          const Icon = rating === 'up' ? ThumbsUpIcon : ThumbsDownIcon;
          return (
            <button
              aria-label={t(rating === 'up' ? 'assistant.rateUp' : 'assistant.rateDown')}
              aria-pressed={message.rating === rating}
              className={cn(
                'flex size-8 items-center justify-center rounded-lg transition-colors disabled:cursor-default',
                message.rating === rating
                  ? 'bg-[#EAF1FF] text-primary'
                  : 'text-[#6B7685] hover:bg-[#F5F6F8] disabled:opacity-50 disabled:hover:bg-transparent'
              )}
              disabled={rated}
              key={rating}
              type='button'
              onClick={() => onRate(rating)}
            >
              <Icon className='size-4' />
            </button>
          );
        })}
      </div>
      {message.rating === 'down' && !message.reason && (
        <div className='flex flex-wrap gap-2'>
          {reasons.map((key) => (
            <Chip key={key} onClick={() => onReason(t(key))}>
              {t(key)}
            </Chip>
          ))}
        </div>
      )}
      {rated && (
        <p className='text-xs leading-4 text-[#6B7685]' role='status'>
          {t('assistant.thanks')}
        </p>
      )}
    </div>
  );
};

interface AssistantProps {
  message: AssistantMessage;
  /** the quick answers and the rating are for the last message */
  last: boolean;
  /** the answer came in a moment ago: its text is written out */
  animate: boolean;
  onSuggestion: (text: string) => void;
  onRephrase: () => void;
  onRate: (rating: 'down' | 'up') => void;
  onReason: (reason: string) => void;
  onStep: () => void;
}

const AssistantAnswer = ({
  message,
  last,
  animate,
  onSuggestion,
  onRephrase,
  onRate,
  onReason,
  onStep
}: AssistantProps) => {
  const t = useTranslations();
  const products = message.products ?? [];
  // an answer that comes in through the socket already grows piece by piece; a whole one (HTTP) is
  // written out here
  const written = useTypewriter(message.text, animate && !message.streaming, onStep);
  const shown = message.streaming ? message.text : written;
  const typing = !!message.streaming || (animate && written.length < message.text.length);

  React.useEffect(() => {
    if (message.streaming) onStep();
  }, [message.streaming, message.text, onStep]);
  const stockUnknown = products.some((product) => (product.stock_status ?? 'check') === 'check');

  return (
    <div className='flex items-start gap-2'>
      <Avatar />
      <div className='grid min-w-0 flex-1 justify-items-start gap-2'>
        <div className='max-w-[92%] rounded-2xl rounded-tl-md bg-[#F5F6F8] px-3.5 py-2.5 text-sm leading-5 break-words text-[#0F1620]'>
          <FormattedText text={shown} />
          {typing && (
            <span
              aria-hidden
              className='bg-primary ml-0.5 inline-block h-4 w-0.5 animate-pulse align-middle'
            />
          )}
        </div>
        {!typing && (
          <>
            {products.length > 0 && (
              <div className='grid w-full gap-2'>
                {products.map((product) => (
                  <ProductMiniCard key={product.id} product={product} />
                ))}
                {message.hasMore && message.query && (
                  <Link
                    className='text-primary inline-flex items-center self-start text-sm font-semibold hover:underline'
                    href={{ pathname: '/search', query: { q: message.query } }}
                  >
                    {t('assistant.seeAll')}
                    <ChevronRightIcon className='size-4' />
                  </Link>
                )}
                <CheckNote stockUnknown={stockUnknown} />
              </div>
            )}
            {message.source && <SourceChip source={message.source} />}
            {message.handoff && (
              <div className='w-full'>
                <OperatorCard />
              </div>
            )}
            {message.notFound && (
              <>
                <div className='flex flex-wrap gap-2'>
                  <Chip onClick={onRephrase}>{t('assistant.rephrase')}</Chip>
                  <Link
                    className='hover:border-primary hover:text-primary rounded-full border border-[#E5E8EC] bg-white px-3.5 py-2 text-sm leading-5 font-medium text-[#0F1620] transition-colors'
                    href='/catalog'
                  >
                    {t('assistant.openCatalog')}
                  </Link>
                </div>
                <OperatorLink />
              </>
            )}
            {(last || message.rating) && (
              <Rating message={message} onRate={onRate} onReason={onReason} />
            )}
            {last && !!message.suggestions?.length && (
              <div className='flex flex-wrap gap-2'>
                {message.suggestions.map((suggestion) => (
                  <Chip key={suggestion} onClick={() => onSuggestion(suggestion)}>
                    {suggestion}
                  </Chip>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/** Three dots and "Typing..." (or "Searching..." while it looks through the catalog). */
export const TypingIndicator = ({ searching }: { searching?: boolean }) => {
  const t = useTranslations();

  return (
    <div aria-live='polite' className='flex items-start gap-2' role='status'>
      <Avatar />
      <div className='grid gap-1'>
        <span className='inline-flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-[#F5F6F8] px-3.5 py-3'>
          {[0, 1, 2].map((dot) => (
            <span
              className='size-1.5 animate-pulse rounded-full bg-[#9AA3AF]'
              key={dot}
              style={{ animationDelay: `${dot * 180}ms` }}
            />
          ))}
        </span>
        <span className='pl-1 text-[11px] leading-4 text-[#6B7685]'>
          {t(searching ? 'assistant.searching' : 'assistant.typing')}
        </span>
      </div>
    </div>
  );
};

interface Props {
  messages: AssistantMessage[];
  loading: boolean;
  /** the assistant is looking through the catalog */
  searching: boolean;
  /** the answer that came in this visit (its text is written out) */
  arrivedId: string | null;
  onSuggestion: (text: string) => void;
  onRephrase: () => void;
  onRate: (id: string, rating: 'down' | 'up') => void;
  onReason: (id: string, reason: string) => void;
  /** the text grew: the panel keeps the end of the chat in view */
  onStep: () => void;
}

export const Messages = ({
  messages,
  loading,
  searching,
  arrivedId,
  onSuggestion,
  onRephrase,
  onRate,
  onReason,
  onStep
}: Props) => (
  <div className='flex flex-col gap-4'>
    {messages.map((message, index) => (
      <React.Fragment key={message.id}>
        {message.role === 'user' ? (
          <UserMessage message={message} />
        ) : (
          <AssistantAnswer
            animate={message.id === arrivedId}
            last={index === messages.length - 1 && !loading && !message.streaming}
            message={message}
            onRate={(rating) => onRate(message.id, rating)}
            onReason={(reason) => onReason(message.id, reason)}
            onRephrase={onRephrase}
            onStep={onStep}
            onSuggestion={onSuggestion}
          />
        )}
        {message.masked && <PiiNotice />}
      </React.Fragment>
    ))}
    {/* the dots only while nothing of the answer is on the screen yet */}
    {loading && !messages.at(-1)?.streaming && <TypingIndicator searching={searching} />}
  </div>
);
