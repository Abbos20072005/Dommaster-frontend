import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';
import { AuthWrapper } from '@/modules/auth';

import { LogoutButton, PersonalInfoForm } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Personal info') };
}

const PersonalInfoPage = () => {
  const t = useTranslations();

  return (
    <>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Personal info')}</h1>
      </div>
      <AuthWrapper>
        <Card className='px-4 border-0 md:p-5 md:border'>
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
