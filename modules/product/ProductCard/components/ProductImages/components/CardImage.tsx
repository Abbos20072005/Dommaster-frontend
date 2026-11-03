import type { ImageProps } from 'next/image';

import Image from 'next/image';

import { cn } from '@/lib/utils';

/**
 * Product photo for a `relative overflow-hidden` slot, used with `fill`. The photo is always
 * shown whole (never cropped); the slot is 3:4 like most product photos, so they fill it, and a
 * photo of another shape leaves a little of the slot's white background.
 */
export const CardImage = ({ className, ...props }: ImageProps) => (
  <Image {...props} className={cn('object-contain', className)} />
);
