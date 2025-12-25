import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { AuthWrapper } from '@/modules/auth';

import { LogoutButton, PersonalInfoForm } from './_components';

const PersonalInfoPage = () => {
  const t = useTranslations();

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
      <AuthWrapper>
        <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
          <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('Personal info')}</h1>
          <PersonalInfoForm />
          <div className='mt-4'>
            <LogoutButton />
          </div>
        </Card>
      </AuthWrapper>
    </>
  );
};

export default PersonalInfoPage;
