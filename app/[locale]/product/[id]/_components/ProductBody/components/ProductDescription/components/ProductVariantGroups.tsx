import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface Props {
  variantGroups: Product['variant_groups'];
}

export const ProductVariantGroups = ({ variantGroups }: Props) => {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <div className='flex flex-col gap-6 pb-6'>
      {variantGroups.map((group) => {
        const currentItem = group.items.find((item) => item.is_current);

        return (
          <div key={group.id} className='flex flex-col gap-3'>
            <span className='text-sm text-foreground'>
              {group.name}
              {currentItem && (
                <span>: {currentItem.display_value}</span>
              )}
            </span>
            <div className='flex flex-wrap gap-2'>
              {group.items.map((item) => {
                const isSelected = item.is_current;
                
                return (
                  <Link
                    key={item.id}
                    className={cn(
                      'flex items-center justify-center overflow-hidden rounded-full border transition-colors',
                      group.display_type === 'image' ? 'h-14 w-14 p-1' : 'h-8 px-4',
                      isSelected
                        ? 'border-primary text-primary'
                        : 'border-transparent bg-secondary text-foreground hover:bg-secondary/80'
                    )}
                    href={`/product/${item.product_id}`}
                  >
                    {group.display_type === 'image' && item.image ? (
                      <div className='relative h-full w-full'>
                        <Image
                          fill
                          alt={item.display_value}
                          className='object-cover'
                          src={item.image}
                        />
                      </div>
                    ) : (
                      <span className='text-sm font-medium'>{item.display_value}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
