import { useTranslations } from 'next-intl';
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
  const t = useTranslations();

  return (
    <>
      <JsonLd data={siteJsonLd()} />
      {/* the only H1 of the home page: the page has no visible title of its own */}
      <h1 className='sr-only'>{t('Home h1')}</h1>
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
