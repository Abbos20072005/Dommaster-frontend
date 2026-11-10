'use client';

import {
  ChevronRightIcon,
  CircleAlertIcon,
  ClockIcon,
  FileTextIcon,
  HeadsetIcon,
  InfoIcon,
  PhoneIcon,
  PowerIcon,
  RotateCwIcon,
  ShieldAlertIcon,
  WifiOffIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/utils/constants';

import type { AssistantErrorKind, AssistantSource } from '../types';

import { useOpenOperator } from './OperatorContext';

const tones = {
  info: 'border-[#CBD2DB] bg-[#F5F6F8]',
  warning: 'border-[#F5A524] bg-[#FFF8E6]',
  error: 'border-[#D92D20] bg-[#FDECEC]'
} as const;

interface BoxProps {
  tone: keyof typeof tones;
  icon: React.ReactNode;
  children: React.ReactNode;
  role?: 'alert' | 'status';
}

/** A note in the chat: a coloured edge on the left, an icon and a text. */
const Box = ({ tone, icon, children, role }: BoxProps) => (
  <div
    className={cn(
      'flex gap-2.5 rounded-lg border-l-[3px] px-3 py-2.5 text-[13px] leading-[18px] text-[#0F1620]',
      tones[tone]
    )}
    role={role}
  >
    <span className='mt-px shrink-0'>{icon}</span>
    <div className='grid min-w-0 flex-1 gap-2'>{children}</div>
  </div>
);

/** Prices and stock change: the answer is not a promise. Under every list of products. */
export const CheckNote = ({ stockUnknown }: { stockUnknown?: boolean }) => {
  const t = useTranslations();

  return (
    <>
      <Box icon={<InfoIcon className='size-4 text-[#6B7685]' />} tone='info'>
        <span>{t('assistant.checkNote')}</span>
      </Box>
      {stockUnknown && (
        <Box icon={<InfoIcon className='size-4 text-[#6B7685]' />} tone='info'>
          <span>{t('assistant.checkStockNote')}</span>
        </Box>
      )}
    </>
  );
};

/** A card number or an SMS code was in the question: it was hidden and the customer is warned. */
export const PiiNotice = () => {
  const t = useTranslations();

  return (
    <Box icon={<ShieldAlertIcon className='size-4 text-[#B54708]' />} role='status' tone='warning'>
      <span>{t('assistant.pii')}</span>
    </Box>
  );
};

/** "Contact an operator": opens the contact window (a call or Telegram). */
export const OperatorButton = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const open = useOpenOperator();

  return (
    <button
      className={cn(
        'bg-primary hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition-colors',
        className
      )}
      type='button'
      onClick={open}
    >
      <PhoneIcon className='size-4' />
      {t('assistant.operator')}
    </button>
  );
};

/** The quiet version of the operator button: a blue text link with a headset. */
export const OperatorLink = () => {
  const t = useTranslations();
  const open = useOpenOperator();

  return (
    <button
      className='text-primary inline-flex items-center gap-1.5 self-start text-[13px] leading-5 font-semibold hover:underline'
      type='button'
      onClick={open}
    >
      <HeadsetIcon className='size-4' />
      {t('assistant.operator')}
    </button>
  );
};

/** The assistant is not the one to answer: the operator card under its message. */
export const OperatorCard = () => {
  const t = useTranslations();

  return (
    <div className='grid gap-3 rounded-xl border border-[#E5E8EC] bg-white p-3'>
      <div className='flex items-start gap-2 text-sm leading-5 text-[#0F1620]'>
        <HeadsetIcon className='text-primary mt-0.5 size-4 shrink-0' />
        {t('assistant.operatorText')}
      </div>
      <OperatorButton className='w-full' />
    </div>
  );
};

/** "Source: Delivery terms": the official page the answer rests on, opened in a new tab. */
export const SourceChip = ({ source }: { source: AssistantSource }) => {
  const t = useTranslations();

  return (
    <Link
      className='inline-flex max-w-full items-center gap-1.5 self-start rounded-full bg-[#F5F6F8] px-3 py-1.5 text-xs font-medium text-[#0F1620] transition-colors hover:bg-[#EAEDF1]'
      href={source.href}
      rel='noopener'
      target='_blank'
    >
      <FileTextIcon className='text-primary size-3.5 shrink-0' />
      <span className='truncate'>{t('assistant.source', { title: source.title })}</span>
      <ChevronRightIcon className='size-3.5 shrink-0 text-[#6B7685]' />
    </Link>
  );
};

/** The question got no answer: why, and what to do (try again or call). */
export const ErrorNotice = ({
  kind,
  onRetry
}: {
  kind: Exclude<AssistantErrorKind, 'disabled' | 'limit'>;
  onRetry: () => void;
}) => {
  const t = useTranslations();

  return (
    <Box
      icon={
        kind === 'offline' ? (
          <WifiOffIcon className='size-4 text-[#B42318]' />
        ) : (
          <CircleAlertIcon className='size-4 text-[#B42318]' />
        )
      }
      role='alert'
      tone='error'
    >
      <span>{t(kind === 'offline' ? 'assistant.offline' : 'assistant.error')}</span>
      <button
        className='inline-flex h-9 items-center gap-1.5 self-start rounded-lg border border-[#E5E8EC] bg-white px-3 text-[13px] font-semibold text-[#0F1620] transition-colors hover:bg-[#F5F6F8]'
        type='button'
        onClick={onRetry}
      >
        <RotateCwIcon className='size-3.5' />
        {t('assistant.retry')}
      </button>
    </Box>
  );
};

/** A whole-panel state: a round icon, a text and a button (no messages, no input). */
const PanelState = ({
  icon,
  tone,
  children
}: {
  icon: React.ReactNode;
  tone: 'blue' | 'grey';
  children: React.ReactNode;
}) => (
  <div className='flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center' role='status'>
    <span
      className={cn(
        'flex size-14 items-center justify-center rounded-full',
        tone === 'blue' ? 'bg-[#EAF1FF]' : 'bg-[#F5F6F8]'
      )}
    >
      {icon}
    </span>
    {children}
  </div>
);

/** The questions of the day are over: the operator helps. The input is switched off. */
export const LimitNotice = () => {
  const t = useTranslations();

  return (
    <PanelState icon={<ClockIcon className='text-primary size-6' />} tone='blue'>
      <p className='max-w-[280px] text-sm leading-5 text-[#0F1620]'>{t('assistant.limit')}</p>
      <OperatorButton />
    </PanelState>
  );
};

/** The assistant is switched off (its budget is over): only the phone, no input. */
export const DisabledNotice = () => {
  const t = useTranslations();

  return (
    <PanelState icon={<PowerIcon className='size-6 text-[#4A5563]' />} tone='grey'>
      <p className='max-w-[280px] text-sm leading-5 text-[#0F1620]'>
        {t('assistant.disabled', { phone: CONTACT_PHONE })}
      </p>
      <a
        className='bg-primary hover:bg-primary/90 inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition-colors'
        href={CONTACT_PHONE_HREF}
      >
        <PhoneIcon className='size-4' />
        {t('assistant.call')}
      </a>
    </PanelState>
  );
};
