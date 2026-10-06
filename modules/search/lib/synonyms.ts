/**
 * Uzbek search words → the word the catalog uses (lower case, one word each).
 * The list is given by the content manager (BLD-100) and is empty until then:
 *   { gisht: 'кирпич' }
 * Latin spellings of Russian words ("sement") do not need an entry — they are transliterated.
 */
export const SEARCH_SYNONYMS: Record<string, string> = {};

/** Replaces every word that has a synonym; the rest of the query stays as typed. */
export const applySynonyms = (query: string): string =>
  query
    .split(/\s+/)
    .map((word) => SEARCH_SYNONYMS[word.toLowerCase()] ?? word)
    .join(' ');
