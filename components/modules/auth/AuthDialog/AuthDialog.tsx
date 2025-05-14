'use client';

import React from 'react';

import { ForgotPasswordForm } from '@/components/modules/auth/AuthDialog/components/ForgotPasswordForm';
import { ResetPasswordForm } from '@/components/modules/auth/AuthDialog/components/ResetPasswordForm';
import { ResetPasswordVerifyForm } from '@/components/modules/auth/AuthDialog/components/ResetPasswordVerifyForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import type { AuthTabs } from './types';

import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { VerifyForm } from './components/VerifyForm';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  defaultStep?: 'login' | 'register';
}

export const AuthDialog = ({ defaultStep = 'login', ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<AuthTabs>(defaultStep);
  const [otpKey, setOtpKey] = React.useState<string>('');
  const [resetToken, setResetToken] = React.useState<string>('');

  React.useEffect(() => {
    if (!open) {
      setTab(defaultStep);
    }
  }, [open]);

  const authSteps: Record<AuthTabs, React.ReactNode> = {
    login: <LoginForm setAuthTab={setTab} onSuccess={() => setOpen(false)} />,
    register: (
      <RegisterForm setAuthTab={setTab} onSuccess={({ result }) => setOtpKey(result.otp_key)} />
    ),
    verify: (
      <VerifyForm
        setOtpKey={setOtpKey}
        onCancel={() => {
          setTab('register');
          setOtpKey('');
        }}
        onSuccess={() => setOpen(false)}
        otpKey={otpKey}
      />
    ),
    forgotPassword: (
      <ForgotPasswordForm
        onSuccess={(data) => {
          setOtpKey(data.result.otp_key);
          setTab('resetPasswordVerify');
        }}
      />
    ),
    resetPasswordVerify: (
      <ResetPasswordVerifyForm
        setOtpKey={setOtpKey}
        onCancel={() => {
          setTab('forgotPassword');
          setResetToken('');
        }}
        onSuccess={(data) => {
          setResetToken(data.result.reset_token);
          setTab('resetPassword');
        }}
        otpKey={otpKey}
      />
    ),
    resetPassword: <ResetPasswordForm onSuccess={() => setTab('login')} resetToken={resetToken} />
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOtpKey('');
        setResetToken('');
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger {...props} />
      <DialogContent className='h-dvh w-full sm:h-auto sm:max-w-[430px]'>
        {authSteps[tab]}
      </DialogContent>
    </Dialog>
  );
};
