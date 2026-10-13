import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { AddressList } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My addresses') };
}

const AddressesPage = async () => {
  const t = await getTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('My addresses')}</h1>
      </div>
      <div className='grid gap-5 px-4 md:px-0'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('My addresses')}
        </h1>
        <AddressList />
      </div>
    </AuthWrapper>
  );
};

export default AddressesPage;
