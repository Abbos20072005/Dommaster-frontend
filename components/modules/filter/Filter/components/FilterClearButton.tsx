'use client';

import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useFilter } from '@/components/modules/filter';
import { Button } from '@/components/ui/button';

export const FilterClearButton = () => {
  const t = useTranslations();
  const { setFilter, isCleared } = useFilter();

  if (isCleared) return null;

  return (
    <div className='flex justify-end'>
      <Button size='sm' variant='link' onClick={() => setFilter(null)}>
        <XIcon />
        {t('Reset all filters')}
      </Button>
    </div>
  );
};
