import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';

export const ProductsSection = () => {
  return (
    <section>
      <BaseLayout>
        <h2 className='text-2xl font-bold'>Подборка от бренда Karcher</h2>
        <ProductList products={productsData} />
      </BaseLayout>
    </section>
  );
};
