/**
 * Products in one sitemap file (Google allows 50 000). The product API takes about 40 ms per
 * product, so a small file is built in ~10 s and does not hit a timeout.
 */
export const PRODUCTS_PER_SITEMAP = 250;

/** `lastmod` from the API `updated_at` (it comes without a time zone, so only the date is used). */
export const lastModified = (updatedAt?: string | null) => {
  const date = updatedAt?.slice(0, 10);
  return date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
};
