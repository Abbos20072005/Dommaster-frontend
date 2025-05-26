'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { postFavorite } from '@/utils/api/requests';

interface Props {
  product: Product;
}

export const ProductControl = ({ product }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const [liked, setLiked] = React.useState(product.is_favourite);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setLiked(product.is_favourite);
  }, [product.is_favourite]);

  const postFavoriteMutation = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      if (!liked) {
        toast(t('Added to favorites'), {
          action: {
            label: t('View'),
            onClick: () => router.push('/user/favorites')
          }
        });
        setLiked(true);
      } else {
        setLiked(false);
      }
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const onToggleFavorite = () => {
    postFavoriteMutation.mutate({ data: { product: product.id } });
  };

  return (
    <div className='flex gap-1'>
      <button
        className={cn('text-muted-foreground hover:text-red-500', {
          'text-red-500': liked
        })}
        type='button'
        onClick={onToggleFavorite}
      >
        <HeartIcon className={cn({ 'fill-red-500': liked })} />
      </button>
    </div>
  );
};
