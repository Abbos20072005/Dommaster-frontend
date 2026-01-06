import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';
import { AuthWrapper } from '@/modules/auth';

import { PromoList } from './components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Promo codes') };
}

const PromoPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Promo codes')}</h1>
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('Promo codes')}</h1>
        <PromoList />
      </Card>
    </AuthWrapper>
  );
};

export default PromoPage;
