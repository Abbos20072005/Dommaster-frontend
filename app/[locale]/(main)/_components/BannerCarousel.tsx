import { getLocale } from 'next-intl/server';

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

export const BannerCarousel = async ({ placement = 'home_top', bare }: Props) => {
  const bannersResponse = await getBanners({ config: { params: { placement, platform: 'site' } } });
  const language = toLanguage(await getLocale());
  const banners = await Promise.all(
    bannersResponse.data.result.map(async (banner) => ({
      ...banner,
      resolved_href: await resolveHref(banner, language)
    }))
  );

  // no banner — no place for it either
  if (!banners.length) return null;

  const slider = <BannerSlider banners={banners} priority={placement === 'home_top'} />;

  if (bare) return <div className='overflow-hidden'>{slider}</div>;

  return <BaseLayout className='overflow-hidden'>{slider}</BaseLayout>;
};
