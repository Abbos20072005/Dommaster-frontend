import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';

export const ProductsSection = () => {
  return (
    <section>
      <BaseLayout>
        <ProductList products={productsData} />
      </BaseLayout>
    </section>
  );
};
