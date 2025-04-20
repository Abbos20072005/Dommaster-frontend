'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';

import type { AuthTabs } from './types';

import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { VerifyForm } from './components/VerifyForm';

interface Props extends React.ComponentProps<typeof DialogTrigger> {}

export const AuthDialog = ({ ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();
  const [tab, setTab] = React.useState<AuthTabs>('login');
  const [otpKey, setOtpKey] = React.useState<string>('');

  React.useEffect(() => {
    if (!open) {
      setTab('login');
    }
  }, [open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props} />
      <DialogContent className='h-dvh w-full sm:h-auto sm:max-w-[450px]'>
        <Tabs value={tab} onValueChange={setTab as any}>
          <TabsContent value='login'>
            <DialogHeader className='mb-6'>
              <DialogTitle className='text-2xl'>{t('Login')}</DialogTitle>
              <DialogDescription>{t('Login to continue')}</DialogDescription>
            </DialogHeader>
            <LoginForm onSuccess={() => setOpen(false)} />
            <Button className='mt-4 w-full' variant='ghost' onClick={() => setTab('register')}>
              {t('Register')}
            </Button>
          </TabsContent>
          <TabsContent value='register'>
            <DialogHeader className='mb-6'>
              <DialogTitle className='text-2xl'>{t('Register')}</DialogTitle>
              <DialogDescription>{t('Enter your credentials to register')}</DialogDescription>
            </DialogHeader>
            <RegisterForm
              onSuccess={({ result }) => {
                setOtpKey(result.otp_key);
                setTab('verify');
              }}
            />
            <Button className='mt-4 w-full' variant='ghost' onClick={() => setTab('login')}>
              {t('Already have an account')}
            </Button>
            <Link href='/terms' className='mt-4 block'>
              <p className='text-muted-foreground hover:text-foreground text-center text-xs underline'>
                {t(
                  'By continuing, you agree to the collection and processing of personal data and the user agreement'
                )}
              </p>
            </Link>
          </TabsContent>
          <TabsContent value='verify'>
            <DialogHeader className='mb-6'>
              <DialogTitle className='text-2xl'>{t('Verify')}</DialogTitle>
              <DialogDescription>
                {t('We have send sms code to your phone number')}.
              </DialogDescription>
            </DialogHeader>
            <VerifyForm
              setOtpKey={setOtpKey}
              onCancel={() => {
                setTab('register');
                setOtpKey('');
              }}
              onSuccess={() => setOpen(false)}
              otpKey={otpKey}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
