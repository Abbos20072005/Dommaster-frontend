import { MobileHeader } from '@/components/layout';
import { getBanners } from '@/utils/api/requests';

import {
  BannerCarousel,
  DiscountProductsSection,
  PopularCategories,
  ProductsSection
} from './_components';

const Home = async () => {
  const bannersResponse = await getBanners();
  const banners = bannersResponse.data.result;

  return (
    <>
      <MobileHeader />
      <div className='mt-2 space-y-6 md:mt-4 lg:space-y-8 xl:space-y-10'>
        <div className='space-y-4 md:space-y-6'>
          <BannerCarousel banners={banners} />
          <PopularCategories />
        </div>
        <DiscountProductsSection />
        <ProductsSection />
      </div>
    </>
  );
};
export default Home;
