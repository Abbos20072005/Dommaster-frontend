'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AuthWrapper } from '@/components/modules/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/utils/stores';

import { LogoutButton, PersonalInfoForm } from './_components';

const PersonalInfoPage = () => {
  const t = useTranslations();
  const { user } = useAuth();

  return (
    <>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/dashboard'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Personal info')}</h1>
        <div className='size-13' />
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('Personal info')}</h1>
        <AuthWrapper>
          {user && <PersonalInfoForm defaultValues={user} />}
          <div className='mt-4'>
            <LogoutButton />
          </div>
        </AuthWrapper>
      </Card>
    </>
  );
};

export default PersonalInfoPage;
