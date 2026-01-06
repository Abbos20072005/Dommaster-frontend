import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import {
  CartProductsCard,
  DeliveryCard,
  PaymentTypeCard,
  PriceCalculationCard
} from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Checkout') };
}

const CartPage = async () => {
  const t = await getTranslations();

  return (
    <div>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Checkout')}</h1>
      </div>
      <BaseLayout className='mt-2 px-2 md:mt-4 md:px-4'>
        <Breadcrumb className='hidden md:mb-4 md:block'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/cart'>{t('Cart')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('Checkout')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 hidden text-lg leading-8 font-bold md:mb-8 md:block md:text-2xl lg:text-3xl'>
          {t('Checkout')}
        </h1>
        <div className='mx-auto flex flex-col gap-4 lg:flex-row'>
          <div className='flex-1 space-y-4'>
            <DeliveryCard />
            <CartProductsCard />
            <PaymentTypeCard />
          </div>
          <div className='lg:w-[360px]'>
            <PriceCalculationCard />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default CartPage;
