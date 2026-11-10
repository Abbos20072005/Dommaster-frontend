import * as React from 'react';

const queries = new Map<number, MediaQueryList>();

/** One shared `MediaQueryList` per width: a catalog page has hundreds of cards that ask. */
const getQuery = (px: number) => {
  let query = queries.get(px);
  if (!query) {
    query = window.matchMedia(`(min-width: ${px}px)`);
    queries.set(px, query);
  }
  return query;
};

/**
 * Whether the screen is at least `px` wide. `null` on the server and during hydration, so the
 * first paint is still the CSS-only markup; after that the caller can drop the variant that the
 * CSS hides (a phone and a laptop layout of the same list would otherwise both stay in the DOM).
 */
export function useMinWidth(px: number) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const query = getQuery(px);
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    },
    [px]
  );

  return React.useSyncExternalStore<boolean | null>(
    subscribe,
    () => getQuery(px).matches,
    () => null
  );
}
