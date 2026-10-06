'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchXIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useDidYouMean } from '@/modules/search';
import { getCategories } from '@/utils/api/requests';

interface Props {
  query: string;
  /** the filters hide some products: offer to reset them first */
  filtersApplied: boolean;
  onResetFilters: () => void;
}

/** Nothing found for a search: why, a corrected query, and popular categories to go on from. */
export const SearchNotFound = ({ query, filtersApplied, onResetFilters }: Props) => {
  const t = useTranslations();
  const didYouMean = useDidYouMean(query, !filtersApplied);
  const categoriesQuery = useQuery({
    queryKey: ['categories', 'main'],
    staleTime: 10 * 60 * 1000,
    queryFn: () => getCategories({ config: { params: { is_main: true } } })
  });

  const suggestion = didYouMean.data;
  const categories = categoriesQuery.data?.data.result ?? [];

  return (
    <EmptyState
      description={t(
        filtersApplied
          ? 'Try changing or removing filters'
          : 'Check the spelling or try a shorter word'
      )}
      icon={<SearchXIcon />}
      title={t('Nothing found for query', { query })}
    >
      {filtersApplied && (
        <Button className='mt-1' variant='muted' onClick={onResetFilters}>
          {t('Reset all filters')}
        </Button>
      )}
      {suggestion && (
        <Link
          className='text-primary text-sm font-semibold hover:underline'
          href={{ pathname: '/search', query: { q: suggestion } }}
        >
          {t('Did you mean suggestion', { suggestion })}
        </Link>
      )}
      {categories.length > 0 && (
        <div className='mt-4 w-full space-y-2'>
          <p className='text-sm font-semibold'>{t('Popular categories')}</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {categories.slice(0, 8).map((category) => (
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className='bg-muted hover:bg-muted/60 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm'
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </EmptyState>
  );
};
