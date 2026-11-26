'use client';

import { CircleCheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@/i18n/navigation';
import { toE164 } from '@/lib/analytics';
import { CONTACT_PHONE } from '@/utils/constants';

import { callbackLimitReached, type CallbackLocation, sendCallbackRequest } from './callbackRequest';

const NAME_MAX = 100;
const COMMENT_MAX = 500;

interface Props {
  /** the button that opens the form (it is not wrapped in a new element) */
  children: React.ReactNode;
  /** where the button is: goes to GA4 with `generate_lead` */
  location: CallbackLocation;
}

/** "Order a call" (BLD-572): the phone is required, the name and the comment are not. */
export const CallbackDialog = ({ children, location }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('+998');
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState('');
  // a double tap must not send the request twice
  const sending = React.useRef(false);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    // a new opening starts from an empty form
    if (value) {
      sending.current = false;
      setDone(false);
      setError('');
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (sending.current) return;

    const cleanPhone = toE164(phone);
    if (!cleanPhone) {
      setError(t(phone.replace(/\D/g, '').length > 3 ? 'Invalid phone number' : 'Fill the required field'));
      return;
    }
    if (callbackLimitReached()) {
      setError(t('Callback too many requests', { phone: CONTACT_PHONE }));
      return;
    }

    sending.current = true;
    sendCallbackRequest(
      { name: name.trim().replace(/\s+/g, ' '), phone: cleanPhone, comment: comment.trim() },
      location
    );
    setName('');
    setPhone('+998');
    setComment('');
    setError('');
    setDone(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {done ? (
          <div className='grid justify-items-center gap-3 py-4 text-center'>
            <CircleCheckIcon className='text-primary size-12' />
            <DialogHeader>
              <DialogTitle>{t('Callback sent title')}</DialogTitle>
              <DialogDescription>{t('Callback sent text')}</DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button className='mt-2' variant='outline'>
                {t('Close')}
              </Button>
            </DialogClose>
          </div>
        ) : (
          <form className='grid gap-4' noValidate onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{t('Order a call')}</DialogTitle>
              <DialogDescription>{t('Callback form hint')}</DialogDescription>
            </DialogHeader>

            <div className='grid gap-1.5'>
              <Label htmlFor={`callback-name-${location}`}>{t('Name')}</Label>
              <Input
                autoComplete='name'
                id={`callback-name-${location}`}
                maxLength={NAME_MAX}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className='grid gap-1.5'>
              <Label htmlFor={`callback-phone-${location}`}>{t('Phone number')}</Label>
              <PhoneInput
                aria-invalid={!!error}
                autoComplete='tel'
                id={`callback-phone-${location}`}
                placeholder='+998 XX XXX XX XX'
                value={phone}
                onChange={(value) => {
                  setPhone(value ?? '+998');
                  setError('');
                }}
              />
              {error && (
                <span className='text-destructive text-[13px] leading-[18px]' role='alert'>
                  {error}
                </span>
              )}
            </div>

            <div className='grid gap-1.5'>
              <Label htmlFor={`callback-comment-${location}`}>
                {t('Comment')} <span className='text-muted-foreground'>({t('optional')})</span>
              </Label>
              <Textarea
                id={`callback-comment-${location}`}
                maxLength={COMMENT_MAX}
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>

            <DialogFooter className='sm:flex-col sm:space-x-0'>
              <Button type='submit'>{t('Send')}</Button>
              {/* the agreement is the line itself, no checkbox (the text is the one of BLD-572) */}
              <p className='text-muted-foreground text-center text-xs leading-4'>
                {t.rich('Callback consent', {
                  privacy: (chunks) => (
                    <Link
                      className='text-primary underline'
                      href='/privacy'
                      rel='noreferrer'
                      target='_blank'
                    >
                      {chunks}
                    </Link>
                  )
                })}
              </p>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
