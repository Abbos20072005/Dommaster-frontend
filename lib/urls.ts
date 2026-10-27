/**
 * The readable addresses (BLD-243): `/catalog/{category}/{sub}/{item}`, `/product/{slug}-{id}`,
 * `/brand/{slug}`. An object without a slug (an old cached answer) gets the old numeric address:
 * it is redirected to the new one, so a link never breaks.
 */

type WithSlug = { id: number; slug?: string | null };

export const productHref = (product: WithSlug) => `/product/${product.slug || product.id}`;

export const brandHref = (brand: WithSlug) => `/brand/${brand.slug || brand.id}`;

/** The address of a category of any level: `categoryHref(category, sub, item)`. */
export const categoryHref = (...levels: WithSlug[]) =>
  levels.every((level) => level.slug)
    ? `/catalog/${levels.map((level) => level.slug).join('/')}`
    : `/category/${levels.map((level) => level.id).join('/')}`;

/** The id at the end of a product address (`{slug}-{id}` or only `{id}`). */
export const productIdFromParam = (param: string) => /(\d+)$/.exec(param)?.[1];
