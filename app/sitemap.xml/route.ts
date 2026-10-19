import { PRODUCTS_PER_SITEMAP } from '@/lib/sitemap';
import { BASE_URL } from '@/utils/constants';

// the index is rebuilt once an hour
export const revalidate = 3600;

/**
 * `/sitemap.xml` is a sitemap INDEX (`<sitemapindex>`): it lists the sitemaps, not the pages.
 * Search engines read the files it lists, so the products and the categories are found
 * (BLD-102). The Next.js `sitemap.ts` can only make a `<urlset>`, hence a route handler.
 */
export async function GET() {
  let productFiles = 0;
  try {
    const res = await fetch(`${process.env.API_URL}product/filter/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 1, page_size: 1 })
    });
    const data = (await res.json()) as ProductsResponse;
    productFiles = Math.ceil((data.result?.totalElements ?? 0) / PRODUCTS_PER_SITEMAP);
  } catch {
    // without the product files the rest of the index is still better than an error
  }

  const sitemaps = [
    `${BASE_URL}/sitemaps/static/sitemap.xml`,
    `${BASE_URL}/sitemaps/categories/sitemap.xml`,
    `${BASE_URL}/sitemaps/brands/sitemap.xml`,
    `${BASE_URL}/sitemaps/news/sitemap.xml`,
    ...Array.from(
      { length: productFiles },
      (_, index) => `${BASE_URL}/sitemaps/products/sitemap/${index + 1}.xml`
    )
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((loc) => `  <sitemap><loc>${loc}</loc></sitemap>`).join('\n')}
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
