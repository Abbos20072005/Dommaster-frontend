'use client';

import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

  const postFavoriteMutation = useMutation({
    mutationFn: postFavorite,
    onSuccess: () => {
      toast(t('Added to favorites'), {
        action: {
          label: t('View'),
          onClick: () => router.push('/favorites')
        }
      });
    }
  });

  const onToggleFavorite = () => {
    postFavoriteMutation.mutate({ data: { product_id: product.id } });
  };

  return (
    <div className='flex gap-1'>
      <button
        className={cn('text-muted-foreground hover:text-foreground', {
          'text-red-500 hover:text-red-600': product.isInFavorites
        })}
        type='button'
        onClick={onToggleFavorite}
      >
        <HeartIcon />
      </button>
    </div>
  );
};
