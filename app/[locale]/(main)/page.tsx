import { MobileHeader } from '@/components/layout';

import {
  BannerCarousel,
  DiscountProductsSection,
  PopularCategories,
  ProductsSection
} from './_components';

const Home = () => {
  return (
    <>
      <MobileHeader />
      <div className='mt-2 space-y-6 md:mt-4 lg:space-y-8 xl:space-y-10'>
        <div className='space-y-4 md:space-y-6'>
          <BannerCarousel />
          <PopularCategories />
        </div>
        <DiscountProductsSection />
        <ProductsSection />
      </div>
    </>
  );
};
export default Home;
