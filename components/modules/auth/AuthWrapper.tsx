'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import type { AuthTabs } from '@/components/modules/auth/AuthDialog/types';

import { LoginForm } from '@/components/modules/auth/AuthDialog/components/LoginForm';
import { RegisterForm } from '@/components/modules/auth/AuthDialog/components/RegisterForm';
import { VerifyForm } from '@/components/modules/auth/AuthDialog/components/VerifyForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/utils/stores';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<AuthTabs>('login');
  const [otpKey, setOtpKey] = React.useState<string>('');
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (user === null) {
    return (
      <Card className='md:max-w-[450px]'>
        <Tabs value={tab} onValueChange={setTab as any}>
          <TabsContent value='login'>
            <CardHeader>
              <CardTitle className='text-2xl'>{t('Login')}</CardTitle>
              <CardDescription>{t('Login to continue')}</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <Button className='mt-4 w-full' variant='ghost' onClick={() => setTab('register')}>
                {t('Register')}
              </Button>
            </CardContent>
          </TabsContent>
          <TabsContent value='register'>
            <CardHeader>
              <CardTitle className='text-2xl'>{t('Register')}</CardTitle>
              <CardDescription>{t('Enter your credentials to register')}</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </TabsContent>
          <TabsContent value='verify'>
            <CardHeader className='mb-6'>
              <CardTitle className='text-2xl'>{t('Verify')}</CardTitle>
              <CardDescription>{t('We have send sms code to your phone number')}.</CardDescription>
            </CardHeader>
            <CardContent>
              <VerifyForm
                setOtpKey={setOtpKey}
                onCancel={() => {
                  setTab('register');
                  setOtpKey('');
                }}
                otpKey={otpKey}
              />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    );
  }

  return children;
};
