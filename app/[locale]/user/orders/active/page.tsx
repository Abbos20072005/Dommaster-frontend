import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { OrdersTabs } from '../_components/OrdersTabs';
import { OrdersActive } from './_components/OrdersActive';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My orders') };
}

const OrdersPage = async () => {
  const t = await getTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('My orders')}</h1>
      </div>
      <div className='grid gap-5 px-4 md:px-0'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('My orders')}
        </h1>
        <div>
          <OrdersTabs />
        </div>
        <OrdersActive />
      </div>
    </AuthWrapper>
  );
};

export default OrdersPage;
