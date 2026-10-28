export interface BannerLinkTarget {
  href: string;
  /** an address outside the site: opened in a new tab */
  external: boolean;
}

/**
 * Where a click on the banner leads (`null` — the banner is not clickable: no target, a badge,
 * or a link type this version does not know yet).
 *
 * A sub-category and an item category need their parents' ids for the address, so they go
 * through `/banner-link/{model}/{id}`, which finds the full address and redirects.
 */
export const getBannerLink = (banner: Banner): BannerLinkTarget | null => {
  const info = banner.content_type_info;

  // old banners: no `link_type`, only a `link`
  if (!banner.link_type) return banner.link ? { href: banner.link, external: true } : null;

  // a product, a brand or a category: the server has already found its readable address
  if (banner.resolved_href && ['product', 'brand', 'category'].includes(banner.link_type)) {
    return { href: banner.resolved_href, external: false };
  }

  switch (banner.link_type) {
    case 'url':
      return banner.link ? { href: banner.link, external: true } : null;
    case 'page':
      return banner.page?.startsWith('/') ? { href: banner.page, external: false } : null;
    case 'product':
      return info ? { href: `/product/${info.id}`, external: false } : null;
    case 'brand':
      return info ? { href: `/brand/${info.id}`, external: false } : null;
    case 'category': {
      if (!info) return null;
      if (info.model === 'productcategory') return { href: `/category/${info.id}`, external: false };
      if (info.model === 'productsubcategory' || info.model === 'productitemcategory')
        return { href: `/banner-link/${info.model}/${info.id}`, external: false };
      return null;
    }
    default:
      return null;
  }
};
