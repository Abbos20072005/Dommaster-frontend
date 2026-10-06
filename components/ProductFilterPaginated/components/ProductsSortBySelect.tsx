'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { resolveSortBy, SORT_OPTIONS } from '../constants';

export const ProductsSortBySelect = () => {
  const t = useTranslations();
  const [q] = useQueryState('q');
  const [sortBy, setSortBy] = useQueryState('sort_by');

  return (
    <Select value={resolveSortBy(sortBy, q)} onValueChange={setSortBy}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder={t('Sort by')} />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {t(option.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
