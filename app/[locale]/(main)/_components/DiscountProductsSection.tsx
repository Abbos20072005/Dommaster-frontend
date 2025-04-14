import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';

export const DiscountProductsSection = () => {
  return (
    <section>
      <BaseLayout className='px-0'>
        <div className='bg-primary rounded-lg px-4 pt-4'>
          <p className='text-primary-foreground mb-2 text-sm'>10 марта – 6 апреля</p>
          <h2 className='text-primary-foreground text-lg font-bold md:text-2xl'>
            Акции и скидки на товары
          </h2>
          <ProductList products={productsData} />
        </div>
      </BaseLayout>
    </section>
  );
};
