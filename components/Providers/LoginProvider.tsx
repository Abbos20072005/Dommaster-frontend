'use client';

import type { PropsWithChildren } from 'react';

import { AlertCircleIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [password, setPassword] = React.useState('');

  const handleCheckPassword = () => {
    if (password === '200220280') {
      setShowPassword(false);
    } else {
      toast.error('Parol xato');
    }
  };

  return (
    <>
      {children}
      {showPassword && (
        <div className='bg-background fixed grid h-screen w-screen place-items-center'>
          <div className='w-full max-w-sm space-y-2'>
            <Card variant='outline'>
              <CardContent className='space-y-4 p-4'>
                <Alert variant='destructive'>
                  <AlertCircleIcon />
                  <AlertTitle>Sayt test rejimda ishlayapti</AlertTitle>
                  <AlertDescription>
                    <p>Foydalanuvchilar uchun hozircha ruxsat yo&apos;q</p>
                  </AlertDescription>
                </Alert>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Parolni kiriting'
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleCheckPassword}>Check</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
