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
          <Badge variant='secondary'>{(100 / product.price) * product.discount_price - 100}%</Badge>
        </div>
      )}
      <div className='text-sm font-bold sm:text-lg'>
        {formatPrice(product.discount_price ?? product.price)} {t('sum')}
      </div>
    </div>
  );
};
