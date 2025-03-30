import { useTranslations } from 'next-intl';

import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductPrice = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <div className='mt-1 mb-3'>
      <div className='mb-3 border-b'>
        <p className='pt-0.5 pb-1 text-sm'>
          {t('Price per')} {product.price.type}
        </p>
      </div>
      <div className='text-sm font-bold sm:text-lg'>
        {formatPrice(product.price.gold)} {t('sum')}
      </div>
    </div>
  );
};
