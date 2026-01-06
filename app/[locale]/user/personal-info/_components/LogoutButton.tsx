'use client';

import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/modules/auth';

export const LogoutButton = () => {
  const t = useTranslations();
  const { reset } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    reset();
    router.push('/');
  };
  return (
    <Button variant='ghostDestructive' onClick={onLogout}>
      <LogOutIcon />
      {t('Logout')}
    </Button>
  );
};
