import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { getAddsBrands } from '@/utils/api/requests';

export const ProductsSection = async () => {
  const addsBrandsResponse = await getAddsBrands();
  const addsBrands = addsBrandsResponse.data.result;

  return addsBrands.map((brand) => (
    <section key={brand.id}>
      <BaseLayout>
        <h2 className='text-lg font-bold md:text-2xl'>{brand.name}</h2>
        <ProductList products={brand.products} />
      </BaseLayout>
    </section>
  ));
};
