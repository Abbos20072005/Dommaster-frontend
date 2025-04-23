import { useCallback } from 'react';

export function useScrollTo(offset: number = 100) {
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    [offset]
  );
}
