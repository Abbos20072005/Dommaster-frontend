'use client';

import { useQueryClient } from '@tanstack/react-query';
import { LockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Link } from '@/i18n/navigation';
import { LoginForm } from '@/modules/auth/AuthDialog/components/LoginForm';
import { VerifyForm } from '@/modules/auth/AuthDialog/components/VerifyForm';
import { useSessionStore } from '@/utils/api/sessionStore';

type Step = 'notice' | 'login' | 'verify';

/**
 * Any request of the cabinet got 401 and the token was not refreshed. The page stays behind the
 * dialog (so unsaved form input is kept); after the SMS code the requests are repeated.
 */
export const SessionExpiredDialog = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { expired, setExpired } = useSessionStore();
  const [step, setStep] = React.useState<Step>('notice');
  const [otpKey, setOtpKey] = React.useState('');

  React.useEffect(() => {
    if (!expired) {
      setStep('notice');
      setOtpKey('');
    }
  }, [expired]);

  return (
    <Dialog open={expired}>
      <DialogContent
        hideCloseButton
        className='h-dvh w-full content-start overflow-y-auto sm:h-auto sm:max-w-[430px]'
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        {step === 'notice' && (
          <>
            <DialogHeader className='items-start gap-3'>
              <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full'>
                <LockIcon className='size-6' />
              </span>
              <DialogTitle className='text-xl leading-[26px] font-bold'>
                {t('Session expired')}
              </DialogTitle>
              <DialogDescription className='text-sm leading-5 text-[#4A5563]'>
                {t('Session expired text')}
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-2 pt-2'>
              <Button className='h-12 w-full' onClick={() => setStep('login')}>
                {t('Login')}
              </Button>
              <Button asChild className='h-12 w-full' variant='ghost'>
                <Link href='/' onClick={() => setExpired(false)}>
                  {t('Go home')}
                </Link>
              </Button>
            </div>
          </>
        )}
        {step === 'login' && (
          <LoginForm
            onSuccess={({ result }) => {
              setOtpKey(result.otp_key);
              setStep('verify');
            }}
          />
        )}
        {step === 'verify' && (
          <VerifyForm
            setOtpKey={setOtpKey}
            onCancel={() => {
              setOtpKey('');
              setStep('login');
            }}
            onSuccess={() => {
              setExpired(false);
              // the failed requests are repeated; the page and its form values stay as they were
              queryClient.invalidateQueries();
            }}
            otpKey={otpKey}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
