import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { PersonalInfoView } from './_components/PersonalInfoView';

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
        <div className='px-4 md:px-0'>
          <PersonalInfoView />
        </div>
      </AuthWrapper>
    </>
  );
};

export default PersonalInfoPage;
