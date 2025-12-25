'use client';

import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { postFavorite } from '@/utils/api/requests';
import { useFavoritesStore } from '@/utils/stores';

interface Props {
  product: Product;
}

export const ProductControl = ({ product }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);

  const postFavoriteMutation = useMutation({
    mutationFn: postFavorite,
    onError: () => {
      toggleFavorite(product);
    }
  });

  const onToggleFavorite = () => {
    const wasFavorite = isFav;

    toggleFavorite(product);

    if (!wasFavorite) {
      toast(t('Added to favorites'), {
        action: {
          label: t('View'),
          onClick: () => router.push('/user/favorites')
        }
      });
    }
    postFavoriteMutation.mutate({ data: { product: product.id } });
  };

  return (
    <div className='flex gap-1'>
      <button
        className={cn('text-muted-foreground hover:text-red-500', {
          'text-red-500': isFav
        })}
        disabled={postFavoriteMutation.isPending}
        type='button'
        onClick={onToggleFavorite}
      >
        <HeartIcon className={cn({ 'fill-red-500': isFav })} />
      </button>
    </div>
  );
};
