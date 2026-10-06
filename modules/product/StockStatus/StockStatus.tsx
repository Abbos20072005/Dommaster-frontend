import { CheckCircle2Icon, CircleAlertIcon, CircleXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

import type { StockStatusType } from './getStockStatus';

import { getStockStatus } from './getStockStatus';

const STATUS = {
  in_stock: { label: 'In stock', Icon: CheckCircle2Icon, className: 'text-green-600' },
  low_stock: { label: 'Low stock', Icon: CircleAlertIcon, className: 'text-amber-600' },
  out_of_stock: { label: 'Out of stock', Icon: CircleXIcon, className: 'text-destructive' }
} satisfies Record<
  StockStatusType,
  { label: string; Icon: typeof CheckCircle2Icon; className: string }
>;

interface Props {
  quantity: number;
  className?: string;
}

/** "In stock" / "Low stock" / "Out of stock" in the customer's language — never an exact number. */
export const StockStatus = ({ quantity, className }: Props) => {
  const t = useTranslations();
  const { label, Icon, className: color } = STATUS[getStockStatus(quantity)];

  return (
    <div className={cn('flex items-center gap-2 text-sm font-medium', color, className)}>
      <Icon className='size-5' />
      <span>{t(label)}</span>
    </div>
  );
};
