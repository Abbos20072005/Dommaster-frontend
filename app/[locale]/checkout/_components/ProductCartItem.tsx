'use client';

import { TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { CartCounter } from '@/components/modules/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';

interface Props {
  checked?: boolean;
  product: Product;
  onCheckedChange?: (checked: boolean) => void;
}

export const ProductCartItem = ({ product, checked, onCheckedChange }: Props) => {
  const t = useTranslations();
  const [value, setValue] = React.useState(1);

  return (
    <div key={product.id} className='flex flex-1 flex-col gap-4 py-4 sm:flex-row'>
      <div className='flex flex-1 gap-1 sm:gap-3'>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
        <Link href={`/product/${product.id}`}>
          <Image
            alt={product.name}
            className='size-[80px] object-contain sm:size-[100px]'
            height={100}
            src={product.images[0].image}
            width={100}
          />
        </Link>
        <div className='flex flex-1 flex-col justify-between gap-3'>
          <div>
            <p className='text-muted-foreground mb-3 text-xs'>
              {t('code')}: {product.id}
            </p>
            <Link href={`/product/${product.id}`} className='line-clamp-3 text-sm'>
              {product.name}
            </Link>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <p className='font-bold'>
              {formatPrice((product.discount_price ?? product.price) * value)} {t('som')}
            </p>
            {product.discount_price && (
              <>
                <span className='text-xs line-through'>
                  {formatPrice(product.price * value)} {t('som')}
                </span>
                <Badge variant='secondary'>-{product.discount}%</Badge>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-row items-end justify-between gap-3 sm:flex-col'>
        <div className='flex flex-row items-center gap-2 sm:flex-col sm:items-start sm:gap-1'>
          <CartCounter
            className='bg-muted w-[120px] rounded-sm'
            maxValue={product.quantity}
            minValue={1}
            value={value}
            onChange={setValue}
          />
          <p className={cn('text-muted-foreground text-xs', value === 1 && 'invisible opacity-0')}>
            {formatPrice(product.discount_price ?? product.price)} {t('som')}/{t('unit')}
          </p>
        </div>
        <Button className='text-muted-foreground' size='sm' variant='ghost'>
          <TrashIcon />
          {t('Delete')}
        </Button>
      </div>
    </div>
  );
};
