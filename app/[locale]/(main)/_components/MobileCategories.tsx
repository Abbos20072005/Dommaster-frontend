import Image from 'next/image';

import { BaseLayout } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { categoryHref } from '@/lib/urls';
import { getCategories } from '@/utils/api/requests';

/**
 * The main categories under the banner (BLD-447): 6 tiles in 3 columns on the phone, 4 columns on
 * the tablet, all of them in one row (no scroll) on the laptop. The tile is the one of the old
 * `PopularCategoriesSection` (508b574).
 */
export const MobileCategories = async () => {
  const response = await getCategories({ config: { params: { is_main: true } } });
  const categories = response.data.result;

  if (!categories.length) return null;

  return (
    <BaseLayout>
      <div className='grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-3 lg:auto-cols-fr lg:grid-flow-col lg:gap-3'>
        {categories.map((item, index) => (
          <Link
            href={categoryHref(item)}
            key={item.id}
            className={cn(
              'bg-muted relative aspect-[4/5] overflow-hidden rounded-xl p-2 md:aspect-[4/3] md:rounded-md lg:p-2.5',
              // the phone keeps two full rows of three
              index >= 6 && 'max-md:hidden'
            )}
          >
            <span className='relative z-1 line-clamp-2 text-xs leading-4 font-medium [word-break:break-word] md:text-sm md:leading-5'>
              {item.name}
            </span>
            <Image
              alt={item.name || 'Buildex'}
              className='absolute inset-x-0 bottom-0 h-[70%] w-full object-contain p-1 md:h-[70%] md:px-3 md:pt-2 md:pb-0 md:object-bottom'
              height={200}
              src={item.image}
              width={200}
            />
          </Link>
        ))}
      </div>
    </BaseLayout>
  );
};
