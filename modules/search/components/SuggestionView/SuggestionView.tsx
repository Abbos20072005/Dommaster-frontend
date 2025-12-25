import { useQuery } from '@tanstack/react-query';
import { ClockIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { getMostSearched, getSearch, getViewedProducts } from '@/utils/api/requests';
import { useSearchHistoryStore } from '@/utils/stores';

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

  const getMostSearchedQuery = useQuery({
    queryKey: ['mostSearched', searchInput],
    queryFn: () => getMostSearched()
  });

  const searchResults = getSearchQuery.data?.data.result;

  const getViewedProductsQuery = useQuery({
    queryKey: ['products', 'viewed'],
    staleTime: 0,
    enabled: !!user,
    queryFn: () => getViewedProducts({ config: { params: { page_size: 5 } } })
  });

  const viewedProducts = getViewedProductsQuery.data?.data.result.content ?? [];
  const mostSearchedProducts = getMostSearchedQuery.data?.data.result ?? [];

  const products = searchResults?.products ?? [];
  const categories = searchResults?.categories ?? [];
  const brands = searchResults?.brands ?? [];

  return (
    <div className='divide-y overflow-y-auto md:max-h-[80vh]'>
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
      {!!products.length && (
        <div className='p-3'>
          <ul>
            {products.map((item) => (
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
      {!searchInput && !!mostSearchedProducts.length && (
        <div className='p-3'>
          <p className='mb-2 text-sm font-bold'>{t('Frequently searched')}</p>
          <ul>
            {mostSearchedProducts.map((item) => (
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
              <article className='hover:bg-muted flex gap-2 rounded-md px-4 py-2.5 transition-colors'>
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
                      {formatPrice(product.discount_price ?? product.price)} {t('sum')}
                    </p>
                    {product.discount_price && (
                      <div className='flex items-center gap-2'>
                        <span className='text-xs line-through'>
                          {product.price} {t('sum')}
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
      {!!categories.length && (
        <div className='px-3 py-3'>
          <p className='mb-2 text-sm font-bold'>{t('Categories')}</p>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2'>
            {categories.map((item) => (
              <Link
                href={`/category/${item.id}`}
                key={item.id}
                className='bg-muted hover:bg-secondary/10 flex items-center gap-3 rounded-md p-2 transition-colors'
                onClick={() => onClose()}
              >
                <Image
                  alt={item.name}
                  className='size-10 rounded-sm object-contain'
                  height={40}
                  src={item.image ?? '/product/no-image.png'}
                  width={40}
                />
                <span className='text-sm font-medium'>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {!!brands.length && (
        <div className='px-3 py-3'>
          <p className='mb-2 text-sm font-bold'>{t('Brands')}</p>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2'>
            {brands.map((item) => (
              <Link
                href={`/brand/${item.id}`}
                key={item.id}
                className='bg-muted hover:bg-secondary/10 flex items-center gap-3 rounded-md p-2 transition-colors'
                onClick={() => onClose()}
              >
                <Image
                  alt={item.name}
                  className='h-10 w-auto rounded-sm object-contain'
                  height={40}
                  src={item.image ?? '/product/no-image.png'}
                  width={140}
                />
                <span className='text-sm font-medium'>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
