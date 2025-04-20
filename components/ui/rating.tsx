import { Star } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface RatingsProps {
  className?: string;
  classNameIcon?: string;
  Icon?: React.ComponentType<any>;
  rating: number | null;
  totalStars?: number;
  onChange?: (rating: number) => void;
}

const Ratings = ({
  className,
  classNameIcon,
  rating,
  totalStars = 5,
  Icon = Star,
  onChange,
  ...props
}: RatingsProps) => {
  rating = rating ?? 0;

  if (rating > totalStars) {
    throw new Error('Rating cannot be greater than totalStars');
  }

  const handleStarClick = (selectedRating: number) => {
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const fullStars = Math.floor(rating);
  const partialStar =
    rating % 1 > 0 ? (
      <PartialStar
        className={classNameIcon}
        fillPercentage={rating % 1}
        isEditable={!!onChange}
        Icon={Icon}
        onClick={() => handleStarClick(Math.ceil(rating))}
      />
    ) : null;

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {[...Array.from({ length: fullStars })].map((_, i) => (
        <Icon
          key={i}
          className={cn('fill-current', classNameIcon, {
            'cursor-pointer transition-transform hover:scale-110': onChange
          })}
          onClick={() => onChange && handleStarClick(i + 1)}
        />
      ))}
      {partialStar}
      {[...Array.from({ length: totalStars - fullStars - (partialStar ? 1 : 0) })].map((_, i) => (
        <Icon
          key={i + fullStars + 1}
          className={cn(classNameIcon, {
            'cursor-pointer transition-transform hover:scale-110': onChange
          })}
          onClick={() => onChange && handleStarClick(i + fullStars + 1 + (partialStar ? 1 : 0))}
        />
      ))}
    </div>
  );
};

interface PartialStarProps {
  className?: string;
  fillPercentage: number;
  Icon: React.ComponentType<any>;
  isEditable?: boolean;
  onClick?: () => void;
}

const PartialStar = ({ fillPercentage, Icon, onClick, isEditable, ...props }: PartialStarProps) => {
  return (
    <div className='relative inline-block'>
      <Icon
        {...props}
        className={cn(props.className, {
          'cursor-pointer transition-transform hover:scale-110': isEditable
        })}
        onClick={onClick}
      />
      <div className='absolute top-0 overflow-hidden' style={{ width: `${fillPercentage * 100}%` }}>
        <Icon
          fill='currentColor'
          {...props}
          className={cn(props.className, {
            'cursor-pointer transition-transform hover:scale-110': isEditable
          })}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export { Ratings };
