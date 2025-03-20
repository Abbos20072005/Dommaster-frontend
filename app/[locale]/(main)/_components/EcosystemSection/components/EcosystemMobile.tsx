import Image from 'next/image';

import { BaseLayout } from '@/components/layout';

export const EcosystemMobile = () => {
  return (
    <BaseLayout>
      <div className='grid grid-cols-3 items-center gap-3 md:hidden'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className='flex flex-col items-center gap-1'>
            <Image
              alt={''}
              className='bg-muted size-15 shrink-0 rounded-md object-contain object-bottom'
              height={60}
              src={'https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'}
              width={60}
            />
            <p className='text-xs'>Category {i}</p>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};
