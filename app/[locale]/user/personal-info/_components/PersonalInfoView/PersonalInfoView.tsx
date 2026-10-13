'use client';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { AlertCircleIcon, LockIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import type { Locale } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { PhoneInput } from '@/components/ui/phone-input';
import { useRouter } from '@/i18n/navigation';
import { LOCALE_LABELS, routing } from '@/i18n/routing';
import { cn, formatPhoneNumber } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { COOKIES } from '@/utils/constants';

import { usePersonalInfoForm } from '../PersonalInfoForm/hooks';

const fieldClass =
  'h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] outline-none transition focus:border-primary focus:ring-[3px] focus:ring-primary/25';

const Section = ({
  title,
  hint,
  children,
  className
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      'border-border grid gap-4 border-t p-5 first:border-t-0 md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 md:p-6',
      className
    )}
  >
    <div className='grid content-start gap-1'>
      <h2 className='text-[17px] leading-6 font-bold'>{title}</h2>
      {hint && <span className='text-muted-foreground text-[13px] leading-[18px]'>{hint}</span>}
    </div>
    <div className='max-w-[560px]'>{children}</div>
  </section>
);

/** Personal info: the fields are editable in place, the save bar shows only when something changed. */
export const PersonalInfoView = () => {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { reset } = useAuth();
  const { form, state, functions } = usePersonalInfoForm();
  const [phoneOpen, setPhoneOpen] = React.useState(false);
  const [newPhone, setNewPhone] = React.useState('');

  // the API keeps one `full_name`: the first word is the name, the rest is the last name
  const fullName = form.watch('full_name') ?? '';
  const [firstName = '', ...rest] = fullName.split(/\s+/).filter(Boolean);
  const lastName = rest.join(' ');
  const setName = (first: string, last: string) =>
    form.setValue('full_name', [first.trim(), last.trim()].filter(Boolean).join(' '), {
      shouldDirty: true,
      shouldValidate: true
    });

  const errors = form.formState.errors;
  const email = form.watch('email');
  const phone = form.watch('phone_number');
  const isDirty = form.formState.isDirty;

  const onLocaleChange = (next: Locale) => {
    if (next === locale) return;
    Cookies.set(COOKIES.LOCALE, next, { expires: 365, path: '/', sameSite: 'lax' });
    router.refresh();
    queryClient.invalidateQueries();
  };

  const onLogout = () => {
    reset();
    router.push('/');
  };

  const applyPhone = () => {
    form.setValue('phone_number', newPhone, { shouldDirty: true, shouldValidate: true });
    setPhoneOpen(false);
  };

  return (
    <div className='grid gap-5'>
      <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
        {t('Personal info')}
      </h1>

      <form className='grid gap-5' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <div className='border-border rounded-xl border bg-white'>
          <Section hint={t('Main data hint')} title={t('Main data')}>
            <div className='grid gap-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='grid content-start gap-1.5'>
                  <span className='text-[13px] font-bold'>{t('First name')}</span>
                  <input
                    aria-invalid={!firstName && isDirty}
                    className={cn(
                      fieldClass,
                      !firstName && isDirty ? 'border-[#C0211D]' : 'border-[#CBD2DB]'
                    )}
                    type='text'
                    value={firstName}
                    onChange={(event) => setName(event.target.value, lastName)}
                  />
                </label>
                <label className='grid content-start gap-1.5'>
                  <span className='text-[13px] font-bold'>
                    {t('Last name')}{' '}
                    <span className='text-muted-foreground font-normal'>· {t('optional')}</span>
                  </span>
                  <input
                    className={cn(fieldClass, 'border-[#CBD2DB]')}
                    type='text'
                    value={lastName}
                    onChange={(event) => setName(firstName, event.target.value)}
                  />
                </label>
              </div>
              <label className='grid gap-1.5'>
                <span className='text-[13px] font-bold'>
                  E-mail{' '}
                  <span className='text-muted-foreground font-normal'>· {t('optional')}</span>
                </span>
                <input
                  aria-invalid={!!errors.email}
                  className={cn(fieldClass, errors.email ? 'border-[#C0211D]' : 'border-[#CBD2DB]')}
                  placeholder='name@mail.uz'
                  type='email'
                  value={email ?? ''}
                  onChange={(event) =>
                    form.setValue('email', event.target.value, {
                      shouldDirty: true,
                      shouldValidate: true
                    })
                  }
                />
                {errors.email ? (
                  <span className='flex items-center gap-1.5 text-xs leading-4 text-[#C0211D]'>
                    <AlertCircleIcon className='size-3.5' />
                    {t(String(errors.email.message))}
                  </span>
                ) : (
                  <span className='text-muted-foreground text-xs leading-4'>
                    {t('E-mail hint')}
                  </span>
                )}
              </label>
            </div>
          </Section>

          <Section hint={t('Phone is used to log in')} title={t('Phone')}>
            <div className='flex items-center gap-4'>
              <div className='border-border bg-muted flex h-11 flex-1 items-center gap-2.5 rounded-lg border px-3.5'>
                <LockIcon className='size-[18px] text-[#6B7685]' />
                <span className='text-[15px] tabular-nums'>{formatPhoneNumber(phone)}</span>
              </div>
              <button
                className='text-primary hover:bg-primary/5 h-11 rounded-lg px-3 text-sm font-bold'
                type='button'
                onClick={() => {
                  setNewPhone('');
                  setPhoneOpen(true);
                }}
              >
                {t('Change')}
              </button>
            </div>
          </Section>

          <Section hint={t('Language hint')} title={t('Interface language')}>
            <div
              aria-label={t('Interface language')}
              className='border-border inline-flex gap-1 rounded-[10px] border bg-[#EDF0F5] p-1'
              role='radiogroup'
            >
              {routing.locales.map((item) => (
                <button
                  aria-checked={item === locale}
                  className={cn(
                    'h-9 rounded-lg px-4 text-sm font-semibold transition-colors',
                    item === locale
                      ? 'text-foreground bg-white shadow-sm'
                      : 'text-[#4A5563] hover:text-foreground'
                  )}
                  key={item}
                  role='radio'
                  type='button'
                  onClick={() => onLocaleChange(item)}
                >
                  {LOCALE_LABELS[item].full}
                </button>
              ))}
            </div>
          </Section>
        </div>

        {isDirty && (
          <div className='sticky bottom-4 z-5 flex items-center justify-between gap-4 rounded-xl border border-[#CBD2DB] bg-white py-3 pr-3 pl-5 shadow-lg'>
            <span className='text-sm font-semibold'>{t('You have unsaved changes')}</span>
            <div className='flex gap-2'>
              <Button
                className='h-11 px-5'
                disabled={state.isPending}
                type='button'
                variant='muted'
                onClick={() => form.reset()}
              >
                {t('Cancel')}
              </Button>
              <Button className='h-11 px-5' isLoading={state.isPending} type='submit'>
                {t('Save')}
              </Button>
            </div>
          </div>
        )}
      </form>

      <div className='mt-4 grid gap-3'>
        <span className='text-muted-foreground text-xs font-bold tracking-wide uppercase'>
          {t('Account management')}
        </span>
        <div className='border-border flex items-center justify-between gap-6 rounded-xl border bg-white px-6 py-5'>
          <span className='grid gap-0.5'>
            <span className='text-[15px] leading-[22px] font-bold'>{t('Log out of account')}</span>
            <span className='text-muted-foreground text-[13px] leading-[18px]'>
              {t('Log out hint')}
            </span>
          </span>
          <Button className='h-11 px-5' type='button' variant='muted' onClick={onLogout}>
            {t('Log out of account')}
          </Button>
        </div>
      </div>

      <Dialog open={phoneOpen} onOpenChange={setPhoneOpen}>
        <DialogContent className='sm:max-w-[460px]'>
          <DialogHeader>
            <DialogTitle>{t('New phone number')}</DialogTitle>
            <DialogDescription>{t('Phone is used to log in')}</DialogDescription>
          </DialogHeader>
          <PhoneInput
            placeholder='+998 XX XXX XX XX'
            value={newPhone}
            onChange={(value) => setNewPhone(String(value ?? ''))}
          />
          <DialogFooter>
            <Button type='button' variant='muted' onClick={() => setPhoneOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button disabled={!/^\+998\d{9}$/.test(newPhone)} type='button' onClick={applyPhone}>
              {t('Save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
