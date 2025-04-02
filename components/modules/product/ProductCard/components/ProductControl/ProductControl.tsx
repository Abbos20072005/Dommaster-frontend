'use client';

import { useMutation } from '@tanstack/react-query';
import { HeartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from '@/i18n/navigation';
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
    <div className='absolute top-0 right-0 z-10 p-1'>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            className='bg-background transition-opacity group-hover/product:opacity-100 md:opacity-0'
            size='iconSm'
            variant='ghost'
            onClick={onToggleFavorite}
          >
            <HeartIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('Add to favorites')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
