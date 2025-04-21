import { Suspense } from 'react';

import { PopularCategoriesSectionSkeleton } from '@/app/[locale]/(main)/_components/PopularCategoriesSectionSkeleton';
import { MobileHeader } from '@/components/layout';

import {
  AddsBrandsSection,
  AddsBrandsSectionLoading,
  BannerCarousel,
  BannerCarouselLoading,
  BrandsSection,
  BrandsSectionLoading,
  DiscountProductsSection,
  PopularCategoriesSection
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
          <Suspense fallback={<PopularCategoriesSectionSkeleton />}>
            <PopularCategoriesSection />
          </Suspense>
        </div>
        <DiscountProductsSection />
        <Suspense fallback={<BrandsSectionLoading />}>
          <BrandsSection />
        </Suspense>
        <Suspense fallback={<AddsBrandsSectionLoading />}>
          <AddsBrandsSection />
        </Suspense>
      </div>
    </>
  );
};
export default Home;
