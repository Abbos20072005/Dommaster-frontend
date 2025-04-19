import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { productsData } from '@/fake-data/products';
import { Link } from '@/i18n/navigation';

import {
  CartProductsCard,
  DeliveryCard,
  PaymentTypeCard,
  PriceCalculationCard
} from './_components';

const CartPage = async () => {
  const t = await getTranslations();

  const products = productsData.filter((product) => product.in_cart);

  return (
    <div>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/cart'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Checkout')}</h1>
        <div className='size-13' />
      </div>
      <BaseLayout className='mt-2 px-0 md:mt-4 md:px-4'>
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
            <CartProductsCard products={products} />
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
