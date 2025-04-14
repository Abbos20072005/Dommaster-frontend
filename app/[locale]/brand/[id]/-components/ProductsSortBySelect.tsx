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

export const ProductsSortBySelect = () => {
  const t = useTranslations();
  const [sortBy, setSortBy] = useQueryState('sortDirection', { defaultValue: 'popularity' });

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder={t('Sort by')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='popularity'>{t('Popularity')}</SelectItem>
        <SelectItem value='asc'>{t('Cheap first')}</SelectItem>
        <SelectItem value='desc'>{t('Expensive first')}</SelectItem>
      </SelectContent>
    </Select>
  );
};
