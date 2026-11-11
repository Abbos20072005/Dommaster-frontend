'use client';

import { ChevronRightIcon, ClockIcon, PhoneIcon, SendIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useOperatorInfo } from '../info';

interface RowProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  external?: boolean;
}

const Row = ({ href, icon, title, subtitle, external }: RowProps) => (
  <a
    className='flex items-center gap-3 rounded-xl border border-[#E5E8EC] bg-white px-3 py-2.5 transition-colors hover:border-[#C9D3E6] hover:bg-[#F5F6F8]'
    href={href}
    {...(external ? { rel: 'noreferrer noopener', target: '_blank' } : {})}
  >
    <span className='bg-[#EAF1FF] text-primary flex size-8 shrink-0 items-center justify-center rounded-full'>
      {icon}
    </span>
    <span className='min-w-0 flex-1'>
      <span className='block text-sm leading-5 font-semibold text-[#0F1620]'>{title}</span>
      {subtitle && <span className='block text-xs leading-4 text-[#6B7685]'>{subtitle}</span>}
    </span>
    <ChevronRightIcon className='size-4 shrink-0 text-[#6B7685]' />
  </a>
);

/** "@name" of a Telegram link, when it has one. */
const telegramHandle = (url: string) => {
  const name = url.split('?')[0].split('/').filter(Boolean).pop();
  return name ? `@${name.replace(/^@/, '')}` : undefined;
};

/**
 * "Contact an operator" (BLD-412, no. 13): a popover inside the panel on a laptop, a bottom sheet
 * on a phone. The contacts come from `/base/info/`: a call, Telegram and the working hours.
 */
export const ContactSheet = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  const info = useOperatorInfo();

  return (
    <div
      className='absolute inset-0 z-20 flex items-end max-md:bg-black/35'
      onClick={onClose}
      role='presentation'
    >
      <div
        aria-label={t('assistant.contactTitle')}
        aria-modal
        className='w-full rounded-t-2xl bg-white p-4 shadow-[0_-8px_30px_rgba(15,22,32,0.18)] md:m-3 md:rounded-2xl md:border md:border-[#E5E8EC] md:p-3 md:shadow-[0_8px_30px_rgba(15,22,32,0.16)]'
        role='dialog'
        onClick={(event) => event.stopPropagation()}
      >
        <span className='mx-auto mb-3 block h-1 w-10 rounded-full bg-[#CBD2DB] md:hidden' />
        <div className='mb-3 flex items-center justify-between gap-3'>
          <h3 className='text-base leading-6 font-semibold text-[#0F1620]'>
            {t('assistant.contactTitle')}
          </h3>
          <button
            aria-label={t('assistant.close')}
            className='flex size-9 items-center justify-center rounded-lg text-[#4A5563] transition-colors hover:bg-[#F5F6F8]'
            type='button'
            onClick={onClose}
          >
            <XIcon className='size-[18px]' />
          </button>
        </div>
        <div className='grid gap-2'>
          <Row
            href={info.phoneHref}
            icon={<PhoneIcon className='size-4' />}
            subtitle={info.phone}
            title={t('assistant.call')}
          />
          {info.telegram && (
            <Row
              external
              href={info.telegram}
              icon={<SendIcon className='size-4' />}
              subtitle={telegramHandle(info.telegram)}
              title={t('assistant.telegramWrite')}
            />
          )}
        </div>
        <p className='mt-3 flex items-center gap-2 text-xs leading-4 text-[#6B7685]'>
          <ClockIcon className='size-3.5' />
          {info.hours ?? t('assistant.workHours')}
        </p>
      </div>
    </div>
  );
};
