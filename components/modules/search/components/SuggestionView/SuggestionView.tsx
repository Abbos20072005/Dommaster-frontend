import { useQuery } from '@tanstack/react-query';
import { ClockIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { getSearch, getViewedProducts } from '@/utils/api/requests';
import { useAuth, useSearchHistoryStore } from '@/utils/stores';

interface Props {
  searchInput: string;
  onClose: () => void;
  setSearchInput: (value: string) => void;
}

export const SuggestionView = ({ searchInput, onClose, setSearchInput }: Props) => {
  const t = useTranslations();
  const searchHistoryStore = useSearchHistoryStore();
  const { user } = useAuth();

  const searchHistory = searchHistoryStore.searchHistory
    .filter((item) => item.includes(searchInput))
    .slice(0, 5);

  const getSearchQuery = useQuery({
    queryKey: ['search', searchInput],
    queryFn: () => getSearch({ config: { params: { q: searchInput } } })
  });

  const searchResults = getSearchQuery.data?.data.result || [];

  const getViewedProductsQuery = useQuery({
    queryKey: ['viewedProducts'],
    staleTime: 0,
    enabled: !!user,
    queryFn: () => getViewedProducts({ config: { params: { page_size: 5 } } })
  });

  const viewedProducts = getViewedProductsQuery.data?.data.result.content;

  return (
    <div className='divide-y'>
      {!!searchHistory.length && (
        <div className='p-3'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-bold'>{t('You searched')}</p>
            <button
              className='hover:text-secondary text-muted-foreground text-sm'
              type='button'
              onClick={searchHistoryStore.clearSearchHistory}
            >
              {t('Clear search history')}
            </button>
          </div>
          <ul>
            {searchHistory
              .filter((item) => item.includes(searchInput))
              .slice(0, 5)
              .map((item) => (
                <li key={item} className='flex'>
                  <Link
                    href={`/search?q=${item}`}
                    className='hover:bg-muted flex flex-1 items-center gap-2 rounded-md py-2.5 transition-colors md:px-4'
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <ClockIcon className='text-muted-foreground size-4 shrink-0' />
                    <span className='text-sm'>{item}</span>
                  </Link>
                  <Button
                    className='shrink-0'
                    size='icon'
                    type='button'
                    variant='ghost'
                    onClick={() => searchHistoryStore.removeSearchHistory(item)}
                  >
                    <XIcon />
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      )}
      {!!searchResults.length && (
        <div className='px-3 py-3'>
          <ul>
            {searchResults.map((item) => (
              <li key={item}>
                <Link
                  href={`/search?q=${item}`}
                  className='hover:bg-muted block rounded-md py-2.5 transition-colors md:px-4'
                  onClick={() => {
                    onClose();
                    searchHistoryStore.addSearchHistory(item);
                    setSearchInput(item);
                  }}
                >
                  <span className='text-sm'>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!searchInput && !!viewedProducts?.length && (
        <div className='p-3'>
          <p className='mb-2 text-sm font-bold'>{t('Recently viewed')}</p>
          {viewedProducts?.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} onClick={onClose}>
              <article className='hover:bg-muted group flex gap-2 rounded-md px-4 py-2.5 transition-colors'>
                <Image
                  alt={'product'}
                  className='bg-background size-14 rounded-md object-contain'
                  height={56}
                  src={product.images[0]?.image ?? '/product/no-image.png'}
                  width={56}
                />
                <div className='space-y-1'>
                  <p className='text-xs'>{product.name}</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-bold'>
                      {formatPrice(product.discount_price ?? product.price)} {t('som')}
                    </p>
                    {product.discount_price && (
                      <div className='flex items-center gap-2'>
                        <span className='text-xs line-through'>
                          {product.price} {t('som')}
                        </span>
                        <Badge variant='secondary'>-{product.discount}%</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
