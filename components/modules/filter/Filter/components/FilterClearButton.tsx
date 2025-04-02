'use client';

import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryStates } from 'nuqs';

import { Button } from '@/components/ui/button';
import { filters } from '@/fake-data/filters';
import { useMounted } from '@/hooks';

export const FilterClearButton = () => {
  const t = useTranslations();
  const [query, setQuery] = useQueryStates(
    filters.reduce(
      (acc, filter) => {
        acc[filter.request_var] = parseAsString;
        return acc;
      },
      {} as Record<string, any>
    )
  );

  const mounted = useMounted();

  if (!mounted || Object.values(query)?.every((value) => value === null)) return null;

  return (
    <div className='flex justify-end'>
      <Button size='sm' variant='link' onClick={() => setQuery(null)}>
        <XIcon />
        {t('Reset all filters')}
      </Button>
    </div>
  );
};
