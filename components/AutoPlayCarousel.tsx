'use client';

import Autoplay from 'embla-carousel-autoplay';

import { Carousel } from '@/components/ui/carousel';

interface Props extends React.ComponentProps<typeof Carousel> {
  delay?: number;
}

export const AutoPlayCarousel = ({ delay, ...props }: Props) => {
  return <Carousel plugins={[Autoplay({ delay })]} {...props} />;
};
