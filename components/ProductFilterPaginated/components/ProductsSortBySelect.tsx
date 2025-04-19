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
  const [sortBy, setSortBy] = useQueryState('sort_by', { defaultValue: 'oldest' });

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className='h-8 w-[180px]'>
        <SelectValue placeholder={t('Sort by')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='oldest'>{t('Older')}</SelectItem>
        <SelectItem value='newest'>{t('Newer')}</SelectItem>
        <SelectItem value='price'>{t('Cheaper')}</SelectItem>
        <SelectItem value='rating'>{t('High rating')}</SelectItem>
      </SelectContent>
    </Select>
  );
};
