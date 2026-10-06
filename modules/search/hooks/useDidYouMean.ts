'use client';

import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/utils/api/requests';

import { extractWords, findClosestWord } from '../lib/suggest';
import { isLatinQuery, transliterate } from '../lib/transliterate';

/** Shorter words are not corrected: one wrong letter changes the meaning too often. */
const MIN_WORD_LENGTH = 4;
const PREFIX_LENGTH = 3;

/**
 * "Did you mean …": for a query that found nothing, the catalog's own words that start the same
 * way are compared with the longest word of the query, and the closest one replaces it
 * ("цемнт" → "цемент"). null while loading or when there is no close word.
 */
export const useDidYouMean = (query: string | null, enabled: boolean) =>
  useQuery({
    queryKey: ['search', 'didYouMean', query],
    enabled: enabled && !!query && query.trim().length >= MIN_WORD_LENGTH,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const text = query?.trim() ?? '';
      const prepared = isLatinQuery(text) ? transliterate(text) : text.toLowerCase();
      const words = prepared.split(/\s+/);
      const target = [...words].sort((a, b) => b.length - a.length)[0];
      if (!target || target.length < MIN_WORD_LENGTH) return null;

      const response = await getProducts({
        data: { q: target.slice(0, PREFIX_LENGTH), page_size: 100 }
      });
      const known = extractWords(response.data.result.content.map((product) => product.name));
      const fixed = findClosestWord(target, known);

      return fixed ? words.map((word) => (word === target ? fixed : word)).join(' ') : null;
    }
  });
