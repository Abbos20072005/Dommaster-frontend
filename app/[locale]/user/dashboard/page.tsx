import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { DesktopCards, MobileCards } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My cabinet') };
}

const DashboardPage = () => {
  return (
    <>
      <MobileCards />
      <DesktopCards />
    </>
  );
};

export default DashboardPage;
