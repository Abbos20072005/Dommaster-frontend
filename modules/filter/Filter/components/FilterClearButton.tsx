'use client';

import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { FilterDefaultValues } from '@/modules/filter/useFilter';

import { Button } from '@/components/ui/button';
import { useFilter } from '@/modules/filter';

interface Props {
  defaultValues?: FilterDefaultValues;
}

export const FilterClearButton = ({ defaultValues }: Props) => {
  const t = useTranslations();
  const { isCleared, onReset } = useFilter(defaultValues);

  if (isCleared) return null;

  return (
    <div className='flex justify-end'>
      <Button size='sm' variant='link' onClick={onReset}>
        <XIcon />
        {t('Reset all filters')}
      </Button>
    </div>
  );
};
