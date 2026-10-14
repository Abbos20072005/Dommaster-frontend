'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ProductList } from '@/modules/product';
import { postCart } from '@/utils/api/requests';
import { useFavoritesStore } from '@/utils/stores';

type Sort = 'new' | 'cheap' | 'expensive';

const priceOf = (product: Product) => product.discount_price ?? product.price;

/** Favorites: the count, the sort and "Add all to cart"; the goods out of stock go last. */
export const FavoriteProductList = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { favorites } = useFavoritesStore();
  const [sort, setSort] = React.useState<Sort>('new');

  const products = React.useMemo(() => {
    // a new favorite is appended to the store: the newest are shown first
    const list = [...favorites].reverse();
    if (sort === 'cheap') list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === 'expensive') list.sort((a, b) => priceOf(b) - priceOf(a));
    return [
      ...list.filter((product) => product.quantity > 0),
      ...list.filter((product) => product.quantity <= 0)
    ];
  }, [favorites, sort]);

  const addable = products.filter((product) => product.quantity > 0 && !product.in_cart);

  const addAllMutation = useMutation({
    mutationFn: () =>
      Promise.allSettled(
        addable.map((product) => postCart({ data: { product: product.id, quantity: 1 } }))
      ),
    onSuccess: (results) => {
      const added = results.filter((result) => result.status === 'fulfilled').length;
      if (added) toast.success(t('Added to cart count', { count: added }));
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  if (favorites.length === 0) {
    return (
      <div className='mx-auto grid max-w-lg place-items-center space-y-5 py-10 md:py-20'>
        <Image
          alt='heart'
          className='size-20 md:size-25'
          height={100}
          src='/favorites/favorites-empty.svg'
          width={100}
        />
        <h1 className='text-xl font-bold'>{t('favorites.emptyTitle')}</h1>
        <p className='text-center text-sm'>{t('favorites.emptyDescription')}</p>
        <Button asChild variant='secondary'>
          <Link href='/'>{t('Go to home')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-3'>
        <span className='text-muted-foreground text-sm'>
          {t('{count} products', { count: favorites.length })}
        </span>
        <label className='ml-auto inline-flex items-center gap-2'>
          <span className='text-muted-foreground hidden text-[13px] sm:inline'>{t('Sort by')}</span>
          <select
            className='focus:border-primary h-10 cursor-pointer rounded-lg border border-[#CBD2DB] bg-white px-3 text-sm outline-none'
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
          >
            <option value='new'>{t('Sort new')}</option>
            <option value='cheap'>{t('Sort cheap')}</option>
            <option value='expensive'>{t('Sort expensive')}</option>
          </select>
        </label>
        <Button
          className='h-10 w-full sm:w-auto'
          disabled={addable.length === 0}
          isLoading={addAllMutation.isPending}
          onClick={() => addAllMutation.mutate()}
        >
          <ShoppingCartIcon className='size-4' />
          {t('Add all to cart')}
        </Button>
      </div>
      <ProductList view='grid' products={products} />
    </div>
  );
};
