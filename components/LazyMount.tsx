'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';

type Props = React.PropsWithChildren<{
  className?: string;
  /** the height held for the block until it is built, so the page does not jump */
  placeholderHeight: number;
  /** how far below the screen the block starts to be built */
  rootMargin?: string;
}>;

/**
 * Builds its children only when they are about to be seen. For blocks that exist only in the
 * browser (their data comes from a request after the page is shown): twenty carousels with a
 * hundred cards were built at once and held the main thread (BLD-485).
 */
export const LazyMount = ({ children, className, placeholderHeight, rootMargin = '600px 0px' }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin });

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={inView ? undefined : { minHeight: placeholderHeight }}
    >
      {inView ? children : null}
    </div>
  );
};
