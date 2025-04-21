import { ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getAddsBrands } from '@/utils/api/requests';

export const AddsBrandsSection = async () => {
  const t = await getTranslations();
  const addsBrandsResponse = await getAddsBrands();
  const addsBrands = addsBrandsResponse.data.result;

  if (!addsBrands.length) return null;

  return addsBrands.map((brand) => (
    <section key={brand.id}>
      <BaseLayout>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-lg font-bold md:text-2xl'>{brand.name}</h2>
          <Button asChild size='sm' variant='muted'>
            <Link href={`/brand/${brand.id}`} scroll>
              {t('View all')}
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <ProductList products={brand.products} />
      </BaseLayout>
    </section>
  ));
};
