import { getLocale } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import { BannerSlider } from '@/components/BannerSlider/BannerSlider';
import { BaseLayout } from '@/components/layout';
import {
  brandSlugById,
  catalogPathByLeaf,
  productSlugById,
  toLanguage
} from '@/lib/catalogTree';
import { brandHref, productHref } from '@/lib/urls';
import { getBanners } from '@/utils/api/requests';

interface Props {
  /** the place on the site: the top of the home page by default, `catalog` for the category pages */
  placement?: BannerPlacement;
  /** no own page padding: the carousel lies inside a layout that already has it */
  bare?: boolean;
}

/**
 * The readable address (BLD-243) of what a product, brand or category banner opens: the admin
 * saves only its id. `null` keeps the old way (the id address, which the site redirects once).
 */
const resolveHref = async (banner: Banner, language: 'ru' | 'uz'): Promise<string | null> => {
  const info = banner.content_type_info;

  if (!info) return null;

  try {
    if (banner.link_type === 'brand') {
      const slug = await brandSlugById(info.id, language);
      return slug ? brandHref({ id: info.id, slug }) : null;
    }
    if (banner.link_type === 'product') {
      const slug = await productSlugById(info.id, language);
      return slug ? productHref({ id: info.id, slug }) : null;
    }
    if (banner.link_type === 'category') {
      return await catalogPathByLeaf(info.model, info.id, language);
    }
  } catch {
    // a failed lookup must not hide the banner: it keeps the id address
  }

  return null;
};

/**
 * The banners of a place with the readable address of each, kept for two minutes per place and
 * language: the page does not wait for the API on every visit (the first picture is the LCP of the
 * home page, BLD-395). The language goes in as a header, so nothing in here reads the request.
 */
const getCachedBanners = unstable_cache(
  async (placement: BannerPlacement, language: 'ru' | 'uz') => {
    const response = await getBanners({
      config: {
        headers: { 'Accept-Language': language },
        params: { placement, platform: 'site' }
      }
    });

    return Promise.all(
      response.data.result.map(async (banner) => ({
        ...banner,
        resolved_href: await resolveHref(banner, language)
      }))
    );
  },
  ['banners'],
  { revalidate: 120 }
);

export const BannerCarousel = async ({ placement = 'home_top', bare }: Props) => {
  const language = toLanguage(await getLocale());
  const banners = await getCachedBanners(placement, language);

  // no banner — no place for it either
  if (!banners.length) return null;

  const slider = <BannerSlider banners={banners} priority={placement === 'home_top'} />;

  if (bare) return <div className='overflow-hidden'>{slider}</div>;

  return <BaseLayout className='overflow-hidden'>{slider}</BaseLayout>;
};
