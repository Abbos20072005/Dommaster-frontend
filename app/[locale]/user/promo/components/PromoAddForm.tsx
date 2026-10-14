'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AlertCircleIcon, CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { postPromoCode } from '@/utils/api/requests';

interface Props {
  /** codes the customer already has: a repeat is answered without a request */
  activeCodes: string[];
  expiredCodes: string[];
  /** called with the saved code (the list scrolls to it and marks it as new) */
  onAdded: (code: string) => void;
}

type Status = { kind: 'err' | 'ok' | 'info'; message: string } | null;

/** Words of the server answer that tell why a code was refused. */
const EXPIRED = /expire|истек|истёк|muddat|tugagan/i;
const USED = /used|использ|ishlat/i;
const EXISTS = /already|exist|уже|mavjud/i;

/** "Add a promo code": checks the code, saves it to the account and says what happened. */
export const PromoAddForm = ({ activeCodes, expiredCodes, onAdded }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [code, setCode] = React.useState('');
  const [status, setStatus] = React.useState<Status>(null);

  const mutation = useMutation({
    mutationFn: (value: string) => postPromoCode({ data: { code: value } })
  });

  const apply = async () => {
    const value = code.trim().toUpperCase();
    if (!value || mutation.isPending) return;

    if (activeCodes.includes(value)) {
      setStatus({ kind: 'info', message: t('Promo already in list', { code: value }) });
      onAdded(value);
      return;
    }
    if (expiredCodes.includes(value)) {
      setStatus({ kind: 'err', message: t('Promo expired message') });
      return;
    }

    setStatus(null);
    try {
      await mutation.mutateAsync(value);
      await queryClient.invalidateQueries({ queryKey: ['promos'] });
      setCode('');
      setStatus({ kind: 'ok', message: t('Promo saved', { code: value }) });
      toast.success(t('Promo added to active'));
      onAdded(value);
    } catch (error) {
      const response = (error as AxiosError<unknown>).response;
      const raw = JSON.stringify(response?.data ?? '');
      if (response?.status && response.status >= 500) {
        setStatus({ kind: 'err', message: t('Promo check failed') });
      } else if (EXPIRED.test(raw)) {
        setStatus({ kind: 'err', message: t('Promo expired message') });
      } else if (USED.test(raw)) {
        setStatus({ kind: 'err', message: t('Promo already used') });
      } else if (EXISTS.test(raw)) {
        setStatus({ kind: 'info', message: t('Promo already in list', { code: value }) });
      } else if (response) {
        setStatus({ kind: 'err', message: t('Promo not found') });
      } else {
        setStatus({ kind: 'err', message: t('Promo check failed') });
      }
    }
  };

  const isError = status?.kind === 'err';
  const canApply = code.trim().length > 0 && !mutation.isPending;

  return (
    <div className='border-border grid gap-2 rounded-2xl border bg-white p-4 md:rounded-xl md:p-5'>
      <label className='text-[15px] leading-5 font-bold md:text-sm' htmlFor='promo-code'>
        {t('Add promo code')}
      </label>
      <div className='flex max-w-[560px] gap-2'>
        <input
          aria-invalid={isError}
          autoComplete='off'
          id='promo-code'
          placeholder={t('Enter promo code')}
          type='text'
          value={code}
          className={cn(
            'focus:ring-primary/25 h-12 min-w-0 flex-1 rounded-lg border bg-white px-3.5 text-base tracking-[0.04em] uppercase outline-none focus:ring-[3px] md:h-11',
            isError ? 'border-[1.5px] border-[#C0211D]' : 'border-[#CBD2DB]'
          )}
          onChange={(event) => {
            setCode(event.target.value);
            if (status?.kind === 'err') setStatus(null);
          }}
          onKeyDown={(event) => event.key === 'Enter' && apply()}
        />
        <button
          disabled={!canApply}
          type='button'
          className={cn(
            'inline-flex h-12 shrink-0 items-center gap-2 rounded-lg px-4 text-[15px] font-bold transition-colors md:h-11 md:px-6 md:text-sm',
            canApply || mutation.isPending
              ? 'bg-primary hover:bg-primary/90 text-white'
              : 'bg-[#EDF0F5] text-[#9AA4B2]'
          )}
          onClick={apply}
        >
          {mutation.isPending && <LoaderCircleIcon className='size-4 animate-spin' />}
          {mutation.isPending ? t('Checking promo') : t('Apply promo')}
        </button>
      </div>

      {status?.kind === 'err' && (
        <span
          className='flex items-center gap-1.5 text-[13px] leading-[18px] text-[#C0211D]'
          role='alert'
        >
          <AlertCircleIcon className='size-4 shrink-0' />
          {status.message}
        </span>
      )}
      {status?.kind === 'ok' && (
        <span
          className='flex items-center gap-1.5 text-[13px] leading-[18px] text-[#0E7C3E]'
          role='status'
        >
          <CheckIcon className='size-4 shrink-0' strokeWidth={2.4} />
          {status.message}
        </span>
      )}
      {status?.kind === 'info' && (
        <span className='text-[13px] leading-[18px] text-[#4A5563]' role='status'>
          {status.message}
        </span>
      )}
    </div>
  );
};
