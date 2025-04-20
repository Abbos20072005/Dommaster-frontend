import type { MouseEvent } from 'react';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

import { useIsMobile, useMounted } from '@/hooks';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<typeof Image> {
  zoomScale?: number;
}

export const ImageZoomer = ({ className, style, zoomScale = 2, ...props }: Props) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x < 0 || y < 0 || x > width || y > height) {
      setPosition((prev) => ({ ...prev, visible: false }));
      return;
    }

    setPosition({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setPosition((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div
      ref={containerRef}
      className='relative size-full cursor-zoom-in overflow-hidden rounded-md'
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Zoomed Image */}
      <Image
        className={cn(
          'absolute top-0 left-0 size-full object-cover transition-transform duration-200',
          className
        )}
        style={
          mounted && isMobile
            ? undefined
            : {
                ...style,
                transformOrigin: `${position.x}px ${position.y}px`,
                transform: position.visible ? `scale(${zoomScale})` : 'scale(1)'
              }
        }
        {...props}
      />
    </div>
  );
};
