import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BaseLayout, MobileHeader } from '@/components/layout';

import { BestsellersList } from './_components/BestsellersList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Bestsellers') };
}

const BestsellersPage = () => (
  <div>
    <MobileHeader />
    <BaseLayout className='mt-2 md:mt-4'>
      <BestsellersList />
    </BaseLayout>
  </div>
);

export default BestsellersPage;
