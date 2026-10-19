import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BaseLayout, MobileHeader } from '@/components/layout';

import { DeleteAccountPanel } from './_components/DeleteAccountPanel';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  // the page is a public address (the stores ask for it), but it is not a page to find in a search
  return { title: t('Delete account'), robots: { index: false, follow: true } };
}

/** Public page of the account deletion: the oferta (9.2) and the privacy policy (9.2) name it. */
const DeleteAccountPage = async () => {
  const t = await getTranslations();

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 max-w-3xl space-y-4 md:mt-4'>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{t('Delete account')}</h1>
        <DeleteAccountPanel />
      </BaseLayout>
    </div>
  );
};

export default DeleteAccountPage;
