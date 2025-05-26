import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductPrice = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <div>
      {product.discount_price && (
        <div className='mb-2 flex items-center gap-2'>
          <span className='text-muted-foreground text-xs line-through'>
            {formatPrice(product.price)} {t('sum')}
          </span>
          <Badge variant='secondary'>-{product.discount}%</Badge>
        </div>
      )}
      <div className='flex flex-wrap-reverse items-center justify-between gap-1'>
        <div className='text-sm font-bold text-nowrap md:text-lg'>
          {formatPrice(product.discount_price ?? 100 * product.price)} {t('sum')}
        </div>
        {product.quantity > 0 && (
          <div className='text-muted-foreground text-xs text-nowrap md:text-sm'>
            {t('unit-pluralization', { count: product.quantity })}
          </div>
        )}
      </div>
    </div>
  );
};
