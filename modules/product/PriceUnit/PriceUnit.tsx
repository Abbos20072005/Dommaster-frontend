import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  unit: ProductUnit;
  className?: string;
}

/** " / шт." next to a price — what the price is for (piece, kg, m…). */
export const PriceUnit = ({ unit, className }: Props) => {
  const t = useTranslations();

  return (
    <span className={cn('text-muted-foreground text-xs font-normal whitespace-nowrap', className)}>
      {' / '}
      {t(unit)}
    </span>
  );
};
