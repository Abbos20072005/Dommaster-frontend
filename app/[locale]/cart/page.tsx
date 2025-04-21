import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
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

import { CartCalculation, ProductCartList } from './_components';

const CartPage = () => {
  const t = useTranslations();

  return (
    <div>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Cart')}</h1>
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
              <BreadcrumbPage>{t('Cart')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 hidden text-lg leading-8 font-bold md:mb-8 md:block md:text-2xl lg:text-3xl'>
          {t('Cart')}
        </h1>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <ProductCartList />
          <div className='lg:w-[360px]'>
            <CartCalculation />
          </div>
        </div>
        <div className='mt-8 px-4 md:px-0'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
          <ProductList products={productsData} />
        </div>
      </BaseLayout>
    </div>
  );
};

export default CartPage;
