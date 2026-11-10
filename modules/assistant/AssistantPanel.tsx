'use client';

import { ArrowDownIcon, ArrowUpIcon, LoaderCircleIcon, MinusIcon, RotateCwIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { AssistantMark } from './components/AssistantMark';
import { ContactSheet } from './components/ContactSheet';
import { Chip, Messages } from './components/Messages';
import { DisabledNotice, ErrorNotice, LimitNotice } from './components/Notices';
import { OperatorProvider } from './components/OperatorContext';
import { useAssistant } from './useAssistant';

const STARTERS = ['assistant.starter1', 'assistant.starter2', 'assistant.starter3', 'assistant.starter4'];

/** A question is at most this long; the counter shows from `COUNTER_FROM`. */
const MAX_LENGTH = 600;
const COUNTER_FROM = 500;

/** The input grows up to 4 lines (20px each), then it scrolls. */
const MAX_INPUT_HEIGHT = 4 * 20 + 20;

/** From this width the panel floats above the launcher; narrower, it is a sheet over the page. */
const DESKTOP_QUERY = '(min-width: 768px)';

interface HeaderButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

/** An icon button of the header: 44px on a phone, 40px on a laptop (the design's touch sizes). */
const HeaderButton = ({ label, onClick, className, children }: HeaderButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        aria-label={label}
        className={cn(
          'focus-visible:outline-primary flex size-11 items-center justify-center rounded-lg text-[#4A5563] transition-colors hover:bg-[#F5F6F8] focus-visible:outline-2 md:size-10',
          className
        )}
        type='button'
        onClick={onClick}
      >
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent side='bottom'>{label}</TooltipContent>
  </Tooltip>
);

interface Props {
  /** minimized: the panel is hidden but alive (an answer can still come in) */
  hidden: boolean;
  /** the "x" button: the window is closed (the chat is kept for the next visit) */
  onClose: () => void;
  onMinimize: () => void;
  /** an answer came in while the panel was hidden: the button shows a dot */
  onUnread: () => void;
}

/**
 * The window of the assistant (BLD-406, the design of BLD-412). A 400×640 panel above the launcher on
 * a laptop; a full-screen sheet from the bottom on a phone. The page behind it is not dimmed.
 */
export const AssistantPanel = ({ hidden, onClose, onMinimize, onUnread }: Props) => {
  const t = useTranslations();
  const { messages, loading, error, arrivedId, send, retry, reset, rate, giveReason } =
    useAssistant();
  const [draft, setDraft] = React.useState('');
  const [scrolledUp, setScrolledUp] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [confirmClear, setConfirmClear] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const stick = React.useRef(true);
  const seen = React.useRef(0);
  const inputId = React.useId();

  const limited = error === 'limit';
  const disabled = error === 'disabled';
  const tooLong = draft.length > MAX_LENGTH;
  const canSend = draft.trim().length > 0 && !loading && !limited && !tooLong;

  React.useEffect(() => {
    // a phone opens the keyboard only when the customer taps the input
    if (window.matchMedia(DESKTOP_QUERY).matches) inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    // the sheet covers the page: it must not scroll behind it
    if (hidden || window.matchMedia(DESKTOP_QUERY).matches) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [hidden]);

  // an answer that came in while the panel was minimized
  React.useEffect(() => {
    if (messages.length > seen.current && messages.at(-1)?.role === 'assistant' && hidden) {
      onUnread();
    }
    seen.current = messages.length;
  }, [messages, hidden, onUnread]);

  const keepBottom = React.useCallback(() => {
    const element = scrollRef.current;
    if (element && stick.current) element.scrollTo({ top: element.scrollHeight });
  }, []);

  React.useEffect(keepBottom, [keepBottom, messages, loading, error]);

  // the input grows with the text, up to 4 lines
  React.useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, MAX_INPUT_HEIGHT)}px`;
    input.style.overflowY = input.scrollHeight > MAX_INPUT_HEIGHT ? 'auto' : 'hidden';
  }, [draft]);

  const onScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const distance = element.scrollHeight - element.scrollTop - element.clientHeight;
    stick.current = distance < 80;
    setScrolledUp(distance > 160);
    setScrolled(element.scrollTop > 4);
  };

  const scrollDown = () => {
    stick.current = true;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  };

  const submit = (text: string) => {
    if (limited || disabled) return;
    stick.current = true;
    send(text);
    setDraft('');
  };

  const startOver = () => {
    reset();
    setDraft('');
    setConfirmClear(false);
    stick.current = true;
  };

  const empty = messages.length === 0;
  // limit and "switched off" take the whole panel (and the input)
  const fullState = limited || disabled;

  return (
    <OperatorProvider value={() => setContactOpen(true)}>
      <section
        aria-label={t('assistant.title')}
        className={cn(
          'fixed z-[60] flex flex-col overflow-hidden bg-white text-[#0F1620]',
          'animate-in fade-in-0 slide-in-from-bottom-4 duration-200',
          // phone: a sheet over the page, safe areas kept
          'inset-x-0 top-2 bottom-0 rounded-t-2xl shadow-[0_-8px_30px_rgba(15,22,32,0.18)]',
          // laptop: 400×640 above the launcher, the page stays alive behind it
          'md:inset-x-auto md:top-auto md:right-6 md:bottom-[92px] md:h-[min(640px,calc(100dvh-116px))] md:w-[400px] md:rounded-2xl md:border md:border-[#E5E8EC] md:shadow-[0_12px_40px_rgba(15,22,32,0.18)]',
          hidden && 'hidden'
        )}
        role='dialog'
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return;
          if (contactOpen) setContactOpen(false);
          else if (confirmClear) setConfirmClear(false);
          else onMinimize();
        }}
      >
        <header
          className={cn(
            'relative z-10 flex items-center gap-2 border-b border-[#E5E8EC] px-4 py-3 transition-shadow',
            scrolled && 'shadow-[0_4px_12px_rgba(15,22,32,0.08)]'
          )}
        >
          <AssistantMark className='text-primary mr-1 size-7' />
          <div className='min-w-0 flex-1'>
            <h2 className='truncate text-base leading-6 font-semibold'>{t('assistant.title')}</h2>
            <p className='text-xs leading-4 text-[#6B7685]'>{t('assistant.subtitle')}</p>
          </div>
          <HeaderButton
            label={t('assistant.newChat')}
            onClick={() => (empty ? startOver() : setConfirmClear((value) => !value))}
          >
            <RotateCwIcon className='size-[18px]' />
          </HeaderButton>
          <HeaderButton className='max-md:hidden' label={t('assistant.minimize')} onClick={onMinimize}>
            <MinusIcon className='size-[18px]' />
          </HeaderButton>
          <HeaderButton label={t('assistant.close')} onClick={onClose}>
            <XIcon className='size-[18px]' />
          </HeaderButton>

          {confirmClear && (
            <div
              className='absolute top-full right-3 z-30 mt-1 w-56 rounded-xl border border-[#E5E8EC] bg-white p-3 shadow-[0_8px_30px_rgba(15,22,32,0.16)]'
              role='alertdialog'
            >
              <p className='text-sm leading-5 font-semibold'>{t('assistant.clearTitle')}</p>
              <div className='mt-3 grid grid-cols-2 gap-2'>
                <button
                  className='h-9 rounded-lg border border-[#E5E8EC] text-[13px] font-semibold transition-colors hover:bg-[#F5F6F8]'
                  type='button'
                  onClick={() => setConfirmClear(false)}
                >
                  {t('assistant.cancel')}
                </button>
                <button
                  className='bg-primary hover:bg-primary/90 h-9 rounded-lg text-[13px] font-semibold text-white transition-colors'
                  type='button'
                  onClick={startOver}
                >
                  {t('assistant.clear')}
                </button>
              </div>
            </div>
          )}
        </header>

        <div className='relative min-h-0 flex-1'>
          <div
            className='h-full overflow-y-auto overscroll-contain px-4 py-4'
            ref={scrollRef}
            onScroll={onScroll}
          >
            {disabled ? (
              <DisabledNotice />
            ) : limited ? (
              <LimitNotice />
            ) : empty && !loading ? (
              <div className='flex min-h-full flex-col items-center justify-center gap-3 pb-6 text-center'>
                <span className='flex size-[60px] items-center justify-center rounded-full bg-[#EAF1FF]'>
                  <AssistantMark className='text-primary size-8' />
                </span>
                <h3 className='text-base leading-6 font-bold'>{t('assistant.greeting')}</h3>
                <p className='max-w-[280px] text-sm leading-5 text-[#6B7685]'>
                  {t('assistant.intro')}
                </p>
                <div className='mt-1 flex flex-wrap justify-center gap-2'>
                  {STARTERS.map((key) => (
                    <Chip key={key} onClick={() => submit(t(key))}>
                      {t(key)}
                    </Chip>
                  ))}
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                <Messages
                  arrivedId={arrivedId}
                  loading={loading}
                  messages={messages}
                  onRate={rate}
                  onReason={giveReason}
                  onRephrase={() => inputRef.current?.focus()}
                  onStep={keepBottom}
                  onSuggestion={submit}
                />
                {error && <ErrorNotice kind={error as 'generic' | 'offline'} onRetry={retry} />}
              </div>
            )}
          </div>

          {scrolledUp && !fullState && (
            <button
              aria-label={t('assistant.scrollDown')}
              className='absolute bottom-3 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-[#E5E8EC] bg-white shadow-md transition-colors hover:bg-[#F5F6F8]'
              type='button'
              onClick={scrollDown}
            >
              <ArrowDownIcon className='size-4' />
            </button>
          )}
        </div>

        {!disabled && (
          <form
            className='border-t border-[#E5E8EC] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
            onSubmit={(event) => {
              event.preventDefault();
              if (canSend) submit(draft);
            }}
          >
            <div className='flex items-end gap-2'>
              <label className='sr-only' htmlFor={inputId}>
                {t('assistant.placeholder')}
              </label>
              <textarea
                autoComplete='off'
                className={cn(
                  // no scrollbar in the field: a long text scrolls, but without the bar
                  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                  'focus:border-primary min-h-10 min-w-0 flex-1 resize-none rounded-lg border border-[#E5E8EC] bg-white px-3 py-2.5 text-sm leading-5 outline-none placeholder:text-[#6B7685] focus:ring-2 focus:ring-[#0059FF]/20 disabled:bg-[#F5F6F8]',
                  tooLong && 'border-[#D92D20] focus:border-[#D92D20] focus:ring-[#D92D20]/20'
                )}
                disabled={limited}
                id={inputId}
                placeholder={t('assistant.placeholder')}
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  // Enter sends, Shift+Enter is a new line
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    if (canSend) submit(draft);
                  }
                }}
              />
              <button
                aria-label={t('assistant.send')}
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
                  canSend || loading ? 'bg-primary text-white' : 'bg-[#E5E8EC] text-[#6B7685]'
                )}
                disabled={!canSend}
                type='submit'
              >
                {loading ? (
                  <LoaderCircleIcon className='size-4 animate-spin' />
                ) : (
                  <ArrowUpIcon className='size-4' />
                )}
              </button>
            </div>
            {draft.length >= COUNTER_FROM && (
              <p
                className={cn(
                  'mt-1 mr-12 text-right text-[11px] leading-4',
                  tooLong ? 'font-medium text-[#B42318]' : 'text-[#6B7685]'
                )}
              >
                {draft.length} / {MAX_LENGTH}
              </p>
            )}
            <p className='mt-2 text-center text-[11px] leading-4 text-[#6B7685]'>
              {t('assistant.disclaimer')}
            </p>
          </form>
        )}

        {contactOpen && <ContactSheet onClose={() => setContactOpen(false)} />}
      </section>
    </OperatorProvider>
  );
};
