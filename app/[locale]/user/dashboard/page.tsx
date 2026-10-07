import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';

import { DesktopCards, MobileCards } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My cabinet') };
}

const PersonalInfoPage = () => {
  return (
    <Card className='border-0 md:p-5 md:border'>
      <MobileCards />
      <DesktopCards />
    </Card>
  );
};

export default PersonalInfoPage;
