import { getTranslations } from 'next-intl/server';

import { BaseLayout } from '@/components/layout';
import { Filter } from '@/components/modules/filter';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';

interface Props {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const t = await getTranslations();

  return (
    <BaseLayout>
      <h1 className='mb-4 text-2xl font-bold'>
        {t('Search results for: {search}', {
          search: q,
          productQty: productsData.length
        })}
      </h1>
      <div className='flex gap-8'>
        <aside className='hidden w-52 lg:block'>
          <Filter />
        </aside>
        <div className='flex-1'>
          <ProductList view='grid' products={productsData} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPage;
