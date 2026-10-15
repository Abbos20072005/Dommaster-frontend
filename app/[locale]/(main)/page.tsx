import { Suspense } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { MobileHeader } from '@/components/layout';
import { siteJsonLd } from '@/lib/jsonLd';

import {
  AddsBrandsSection,
  BannerCarousel,
  BannerCarouselLoading,
  // BenefitsCards, // vaqtincha o'chirilgan
  BrandsSection,
  BrandsSectionLoading,
  DiscountProductsSection,
  MostSoldProductsSection,
  UsefulContentSection,
  UsefulContentSectionLoading
} from './_components';

const Home = () => {
  return (
    <>
      <JsonLd data={siteJsonLd()} />
      <MobileHeader />
      <div className='mt-2 space-y-6 md:mt-4 lg:space-y-8 xl:space-y-10'>
        <div className='space-y-4 md:space-y-6'>
          {/* Vaqtincha o'chirilgan (afzalliklar kartalari):
          <BenefitsCards />
          */}
          <Suspense fallback={<BannerCarouselLoading />}>
            <BannerCarousel />
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
