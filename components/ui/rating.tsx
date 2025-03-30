import { Star } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameIcon?: string;
  Icon?: React.ComponentType<any>;
  rating: number | null;
  totalStars?: number;
}

const Ratings = ({
  className,
  classNameIcon,
  rating,
  totalStars = 5,
  Icon = Star,
  ...props
}: RatingsProps) => {
  rating = rating ?? 0;

  if (rating > totalStars) {
    throw new Error('Rating cannot be greater than totalStars');
  }

  const fullStars = Math.floor(rating);
  const partialStar =
    rating % 1 > 0 ? (
      <PartialStar className={classNameIcon} fillPercentage={rating % 1} Icon={Icon} />
    ) : null;

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {[...Array.from({ length: fullStars })].map((_, i) => (
        <Icon key={i} className={cn('fill-current', classNameIcon)} />
      ))}
      {partialStar}
      {[...Array.from({ length: totalStars - fullStars - (partialStar ? 1 : 0) })].map((_, i) => (
        <Icon key={i + fullStars + 1} className={classNameIcon} />
      ))}
    </div>
  );
};

interface PartialStarProps {
  className?: string;
  fillPercentage: number;
  Icon: React.ComponentType<any>;
}
const PartialStar = ({ fillPercentage, Icon, ...props }: PartialStarProps) => {
  return (
    <div className='relative inline-block'>
      <Icon {...props} />
      <div className='absolute top-0 overflow-hidden' style={{ width: `${fillPercentage * 100}%` }}>
        <Icon fill='currentColor' {...props} />
      </div>
    </div>
  );
};

export { Ratings };
