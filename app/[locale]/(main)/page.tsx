import { Suspense } from 'react';

import { MobileHeader } from '@/components/layout';

import {
  AddsBrandsSection,
  BannerCarousel,
  BannerCarouselLoading,
  BrandsSection,
  BrandsSectionLoading,
  DiscountProductsSection,
  MostSoldProductsSection,
  PopularCategoriesSection,
  PopularCategoriesSectionSkeleton,
  UsefulContentSection,
  UsefulContentSectionLoading
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
        <MostSoldProductsSection />
        <Suspense fallback={<UsefulContentSectionLoading />}>
          <UsefulContentSection />
        </Suspense>
        <AddsBrandsSection />
      </div>
    </>
  );
};
export default Home;
