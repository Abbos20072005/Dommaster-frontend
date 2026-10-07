'use client';

import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useMounted } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { AuthDialog } from '@/modules/auth/AuthDialog';
import { postFavorite } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';
import { useFavoritesStore } from '@/utils/stores';

interface Props {
  product: Product;
  className?: string;
  /** matnli (kengroq) tugma — mahsulot sahifasi uchun */
  withLabel?: boolean;
}

export const ProductControl = ({ product, className, withLabel }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const mounted = useMounted();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(product.id);
  // Mehmon uchun backend sevimlilarni saqlamaydi (har safar yangi yozuv yaratadi) — avval login
  const needsAuth = mounted && !Cookies.get(COOKIES.ACCESS_TOKEN);

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

  const button = (
    <button
      className={cn(
        withLabel
          ? 'bg-background text-foreground hover:bg-muted flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors'
          : 'bg-background/90 text-muted-foreground flex size-8 items-center justify-center rounded-full shadow-sm hover:text-red-500',
        { 'text-red-500': isFav && !withLabel },
        className
      )}
      aria-label={t('Favorites')}
      disabled={postFavoriteMutation.isPending}
      type='button'
      onClick={needsAuth ? undefined : onToggleFavorite}
    >
      <HeartIcon className={cn('size-4', { 'fill-red-500 text-red-500': isFav })} />
      {withLabel && (
        <span className='whitespace-nowrap'>{isFav ? t('In favorites') : t('To favorites')}</span>
      )}
    </button>
  );

  return (
    <div className={cn('flex gap-1', { 'w-full': withLabel })}>
      {needsAuth ? <AuthDialog asChild>{button}</AuthDialog> : button}
    </div>
  );
};
