import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';

import { PromoList } from './components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Promo codes') };
}

const PromoPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <MobilePageHeader title={t('Promo codes')} />
      <div className='grid grid-cols-[minmax(0,1fr)] gap-5 px-4 md:px-0'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('Promo codes')}
        </h1>
        <PromoList />
      </div>
    </AuthWrapper>
  );
};

export default PromoPage;
