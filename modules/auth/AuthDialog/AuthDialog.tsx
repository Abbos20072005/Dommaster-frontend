'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { AuthTabs } from './types';

// The forms (react-hook-form, zod, the phone input with its number metadata) are loaded when the
// window is first wanted, not with every page: the dialog is on every page in the header (BLD-395)
const loadLoginForm = () => import('./components/LoginForm').then((module) => module.LoginForm);
const loadVerifyForm = () => import('./components/VerifyForm').then((module) => module.VerifyForm);
const LoginForm = dynamic(loadLoginForm);
const VerifyForm = dynamic(loadVerifyForm);

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
      <DialogTrigger
        {...props}
        // the forms start loading when a finger or a cursor comes near the button
        onFocus={(event) => {
          void loadLoginForm();
          props.onFocus?.(event);
        }}
        onPointerEnter={(event) => {
          void loadLoginForm();
          props.onPointerEnter?.(event);
        }}
      />
      <DialogContent className='h-dvh w-full overflow-y-auto sm:h-auto sm:max-w-430px'>
        {authSteps[tab]}
      </DialogContent>
    </Dialog>
  );
};