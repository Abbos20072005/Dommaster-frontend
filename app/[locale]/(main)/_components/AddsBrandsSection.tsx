'use client';

import { useQuery } from '@tanstack/react-query';

import { BannerSlider } from '@/components/BannerSlider/BannerSlider';
import { BaseLayout } from '@/components/layout';
import { ProductSection } from '@/modules/product';
import { getMain } from '@/utils/api/requests';

import { AddsBrandsSectionLoading } from './AddsBrandsSectionLoading';

export const AddsBrandsSection = () => {
  const getMainQuery = useQuery({
    queryKey: ['main'],
    staleTime: 0,
    queryFn: () => getMain()
  });

  const main = getMainQuery.data?.data.result || [];

  if (getMainQuery.isLoading) return <AddsBrandsSectionLoading />;

  if (!main.length) return null;

  // Banner sarlavhasi backenddan bo'sh kelishi mumkin (masalan o'zbekcha to'ldirilmagan) — alt bo'sh qolmasin
  return main.map((item, index) => (
    <section key={item.type === 'banners' ? `banners-${index}` : `${item.data.id}${item.type}`}>
      <BaseLayout>
        {item.type === 'addsbrands' ? (
          <ProductSection
            href={`/collection/${item.data.id}`}
            products={item.data.products}
            title={item.data.name ? <h2 className='text-lg font-bold md:text-2xl'>{item.data.name}</h2> : <div />}
          />
        ) : item.type === 'banners' ? (
          <div className='overflow-hidden'>
            <BannerSlider banners={item.data} />
          </div>
        ) : null}
      </BaseLayout>
    </section>
  ));
};
