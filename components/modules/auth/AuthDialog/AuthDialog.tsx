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
import { Link } from '@/i18n/routing';

import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange, ...props }: Props) => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<'login' | 'register'>('login');
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      {open === undefined && <DialogTrigger {...props} />}
      <DialogContent className='w-[400px]'>
        <Tabs value={tab} onValueChange={setTab as any}>
          <TabsContent value='login'>
            <DialogHeader className='mb-6'>
              <DialogTitle className='text-2xl'>{t('Login')}</DialogTitle>
              <DialogDescription>{t('Login to continue')}</DialogDescription>
            </DialogHeader>
            <LoginForm />
          </TabsContent>
          <TabsContent value='register'>
            <DialogHeader className='mb-6'>
              <DialogTitle className='text-2xl'>{t('Register')}</DialogTitle>
              <DialogDescription>{t('Enter your credentials to register')}</DialogDescription>
            </DialogHeader>
            <RegisterForm />
          </TabsContent>
          {tab === 'login' && (
            <Button className='w-full' variant='ghost' onClick={() => setTab('register')}>
              {t('Register')}
            </Button>
          )}
          {tab === 'register' && (
            <Button className='w-full' variant='ghost' onClick={() => setTab('login')}>
              {t('Already have an account')}
            </Button>
          )}
        </Tabs>
        <Link href='/terms'>
          <p className='text-muted-foreground hover:text-foreground text-center text-xs underline'>
            {t(
              'By continuing, you agree to the collection and processing of personal data and the user agreement'
            )}
          </p>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
