/** Sorting offered in the catalog; the labels are i18n keys. */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newer' },
  { value: 'rating', label: 'High rating' },
  { value: 'price', label: 'Cheaper' }
] as const;

/**
 * Default sorting of the catalog lists. Without `sort_by` the backend returns the oldest
 * products first (BLD-99). Newest first is used until there are reviews: today no product has a
 * rating, so sorting by rating would change nothing. PM may switch it to popularity or
 * in-stock first later — change it here only. Search keeps the backend relevance order.
 */
export const DEFAULT_SORT_BY: (typeof SORT_OPTIONS)[number]['value'] = 'newest';

/** The `sort_by` to use: the chosen one if it is known, else the default (not for a search). */
export const resolveSortBy = (sortBy: string | null, q: string | null): string | undefined => {
  if (SORT_OPTIONS.some((option) => option.value === sortBy)) return sortBy ?? undefined;
  return q ? undefined : DEFAULT_SORT_BY;
};
