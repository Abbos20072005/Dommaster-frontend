'use client';

import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { AuthTabs } from './types';

import { LoginForm } from './components/LoginForm';
import { VerifyForm } from './components/VerifyForm';

type Props = React.ComponentProps<typeof DialogTrigger>;

export const AuthDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<AuthTabs>('login');
  const [otpKey, setOtpKey] = React.useState<string>('');

  React.useEffect(() => {
    if (!open) {
      setTab('login');
    }
  }, [open]);

  const authSteps: Record<AuthTabs, React.ReactNode> = {
    login: (
      <LoginForm
        onSuccess={({ result }) => {
          setOtpKey(result.otp_key);
          setTab('verify');
        }}
      />
    ),
    verify: (
      <VerifyForm
        setOtpKey={setOtpKey}
        onCancel={() => {
          setTab('login');
          setOtpKey('');
        }}
        onSuccess={() => setOpen(false)}
        otpKey={otpKey}
      />
    )
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOtpKey('');
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger {...props} />
      <DialogContent className='h-dvh w-full overflow-y-auto sm:h-auto sm:max-w-430px'>
        {authSteps[tab]}
      </DialogContent>
    </Dialog>
  );
};