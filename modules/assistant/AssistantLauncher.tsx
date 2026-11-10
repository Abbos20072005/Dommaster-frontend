'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React from 'react';

import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

import { AssistantMark } from './components/AssistantMark';
import { ASSISTANT_ENABLED } from './config';

// the window is a separate chunk: it is loaded when the customer reaches for the button, so the
// first load of a page does not carry it (BLD-394)
const loadPanel = () => import('./AssistantPanel').then((module) => module.AssistantPanel);
const AssistantPanel = dynamic(loadPanel, { ssr: false });

/**
 * The floating button of the AI assistant on every page (BLD-406, the design of BLD-412): bottom
 * right, 24 px from the edges on a laptop; 16 px and above the bottom menu on a phone. On a product
 * page it stands above the price bar (see `globals.css`). Minimizing the window keeps it alive: an
 * answer that comes in meanwhile puts a dot on the button. Nothing is rendered until the chat
 * endpoint is switched on (`NEXT_PUBLIC_ASSISTANT_ENABLED`).
 */
export const AssistantLauncher = () => {
  const t = useTranslations();
  // `mounted`: the window exists (it is loaded and keeps the chat); `open`: it is on the screen
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [unread, setUnread] = React.useState(false);

  const onUnread = React.useCallback(() => setUnread(true), []);

  if (!ASSISTANT_ENABLED) return null;

  const toggle = () => {
    if (!open) trackEvent('assistant_open');
    setMounted(true);
    setOpen((value) => !value);
    setUnread(false);
  };

  const label = open ? t('assistant.close') : t('assistant.launcher');

  return (
    <>
      <div
        className={cn(
          'group fixed right-4 bottom-[calc(4.5rem+1rem)] z-50 flex size-[52px] items-center justify-center md:right-6 md:bottom-6 md:size-14',
          // a phone: the sheet covers the button
          open && 'max-md:hidden'
        )}
        data-assistant-launcher
      >
        <span className='pointer-events-none absolute right-full mr-3 hidden rounded-full bg-white px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-[#0F1620] opacity-0 shadow-[0_4px_16px_rgba(15,22,32,0.16)] transition-opacity group-hover:opacity-100 md:block'>
          {label}
        </span>
        <button
          aria-expanded={open}
          aria-label={unread ? `${label}. ${t('assistant.newAnswer')}` : label}
          className={cn(
            'bg-primary focus-visible:outline-primary relative flex items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(0,89,255,0.35)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95',
            open ? 'size-[50px]' : 'size-full'
          )}
          type='button'
          onClick={toggle}
          onFocus={() => void loadPanel()}
          onMouseEnter={() => void loadPanel()}
        >
          {open ? (
            <ChevronDownIcon className='size-6' />
          ) : (
            <AssistantMark className='size-7 text-white' sparkle='#0059FF' />
          )}
          {unread && !open && (
            <span className='absolute top-0.5 right-0.5 size-3 rounded-full border-2 border-white bg-[#FFB700]' />
          )}
        </button>
      </div>
      {mounted && (
        <AssistantPanel
          hidden={!open}
          onClose={() => {
            setMounted(false);
            setOpen(false);
          }}
          onMinimize={() => setOpen(false)}
          onUnread={onUnread}
        />
      )}
    </>
  );
};
