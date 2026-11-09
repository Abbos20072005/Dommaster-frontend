import Image from 'next/image';

import { BaseLayout } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { categoryHref } from '@/lib/urls';
import { getCategories } from '@/utils/api/requests';

/** Phone only: the main categories as 3-column tiles under the banner (the desktop has the menu). */
export const MobileCategories = async () => {
  const response = await getCategories({ config: { params: { is_main: true } } });
  const categories = response.data.result.slice(0, 6);

  if (!categories.length) return null;

  return (
    <BaseLayout className='md:hidden'>
      <div className='grid grid-cols-3 gap-2'>
        {categories.map((item) => (
          <Link
            href={categoryHref(item)}
            key={item.id}
            className='bg-muted relative aspect-[4/5] overflow-hidden rounded-xl p-2'
          >
            <span className='relative z-1 line-clamp-2 text-xs leading-4 font-medium [word-break:break-word]'>
              {item.name}
            </span>
            <Image
              alt={item.name || 'Buildex'}
              className='absolute inset-x-0 bottom-0 h-[70%] w-full object-contain p-1'
              height={120}
              src={item.image}
              width={120}
            />
          </Link>
        ))}
      </div>
    </BaseLayout>
  );
};
