import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';

import { PersonalInfoView } from './_components/PersonalInfoView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Personal info') };
}

const PersonalInfoPage = () => {
  const t = useTranslations();

  return (
    <>
      <MobilePageHeader title={t('Personal info')} />
      <AuthWrapper>
        <div className='px-4 md:px-0'>
          <PersonalInfoView />
        </div>
      </AuthWrapper>
    </>
  );
};

export default PersonalInfoPage;
