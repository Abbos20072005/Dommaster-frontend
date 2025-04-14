'use client';

import { useMutation } from '@tanstack/react-query';
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
    }
  });

  const onToggleFavorite = () => {
    postFavoriteMutation.mutate({ data: { product: product.id } });
  };

  return (
    <div className='flex gap-1'>
      <button
        className={cn('text-muted-foreground hover:text-foreground', {
          'text-red-500 hover:text-red-600': liked
        })}
        type='button'
        onClick={onToggleFavorite}
      >
        <HeartIcon />
      </button>
    </div>
  );
};
