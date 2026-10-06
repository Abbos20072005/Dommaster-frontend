import { getProducts } from '@/utils/api/requests';

import { applySynonyms } from './synonyms';
import { isLatinQuery, transliterateVariants } from './transliterate';

/**
 * Product search that understands how customers really type (BLD-100):
 * - Uzbek synonyms are replaced by the catalog word;
 * - a query in Latin letters ("sement") is searched in Cyrillic first ("цемент"); if that finds
 *   nothing (a brand like "knauf"), the query is searched as typed.
 * Requests without a text query go to the API unchanged.
 */
export async function searchProducts(request: ProductRequest) {
  const query = request.q?.trim();
  if (!query) return getProducts({ data: request });

  const prepared = applySynonyms(query);

  if (isLatinQuery(prepared)) {
    for (const cyrillic of transliterateVariants(prepared)) {
      const response = await getProducts({ data: { ...request, q: cyrillic } });
      if (response.data.result.totalElements > 0) return response;
    }
  }

  return getProducts({ data: { ...request, q: prepared } });
}
