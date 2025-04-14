import { Suspense } from 'react';

import { MobileHeader } from '@/components/layout';

import {
  BannerCarousel,
  BannerCarouselLoading,
  BrandsSection,
  BrandsSectionLoading,
  DiscountProductsSection,
  PopularCategories,
  ProductsSection,
  ProductsSectionLoading
} from './_components';

const Home = () => {
  return (
    <>
      <MobileHeader />
      <div className='mt-2 space-y-6 md:mt-4 lg:space-y-8 xl:space-y-10'>
        <div className='space-y-4 md:space-y-6'>
          <Suspense fallback={<BannerCarouselLoading />}>
            <BannerCarousel />
          </Suspense>
          <PopularCategories />
        </div>
        <DiscountProductsSection />
        <Suspense fallback={<BrandsSectionLoading />}>
          <BrandsSection />
        </Suspense>
        <Suspense fallback={<ProductsSectionLoading />}>
          <ProductsSection />
        </Suspense>
      </div>
    </>
  );
};
export default Home;
