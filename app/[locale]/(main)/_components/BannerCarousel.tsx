import { BannerSlider } from '@/components/BannerSlider/BannerSlider';
import { BaseLayout } from '@/components/layout';
import { getBanners } from '@/utils/api/requests';

interface Props {
  /** the place on the site: the top of the home page by default, `catalog` for the category pages */
  placement?: BannerPlacement;
  /** no own page padding: the carousel lies inside a layout that already has it */
  bare?: boolean;
}

export const BannerCarousel = async ({ placement = 'home_top', bare }: Props) => {
  const bannersResponse = await getBanners({ config: { params: { placement, platform: 'site' } } });
  const banners = bannersResponse.data.result;

  // no banner — no place for it either
  if (!banners.length) return null;

  const slider = <BannerSlider banners={banners} priority={placement === 'home_top'} />;

  if (bare) return <div className='overflow-hidden'>{slider}</div>;

  return <BaseLayout className='overflow-hidden'>{slider}</BaseLayout>;
};
