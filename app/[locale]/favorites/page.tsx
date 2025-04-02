import { getTranslations } from 'next-intl/server';

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
import { productsData } from '@/fake-data/products';

const WishlistPage = async () => {
  const t = await getTranslations();

  return (
    <BaseLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Favorites</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mt-4 mb-6 text-xl font-bold md:text-2xl'>{t('Your list of products')}</h1>
      <ProductList view='grid' products={productsData} />
    </BaseLayout>
  );
};

export default WishlistPage;
