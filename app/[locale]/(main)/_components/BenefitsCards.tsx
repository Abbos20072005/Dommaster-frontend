import { CircleCheckBigIcon, PaintRollerIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';

const items = [
  {
    icon: PaintRollerIcon,
    description: 'benefits.1',
    url: ''
  },
  {
    icon: TruckIcon,
    description: 'benefits.2',
    utl: ''
  },
  {
    icon: RotateCcwIcon,
    description: 'benefits.3',
    utl: ''
  },
  {
    icon: CircleCheckBigIcon,
    description: 'benefits.4',
    utl: ''
  }
];

export const BenefitsCards = () => {
  const t = useTranslations();
  return (
    <section className='overflow-hidden'>
      <BaseLayout>
        <Carousel>
          <CarouselContent className='-ml-2 sm:-ml-4' noOverflowHiddenOnMobile>
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className='basis-full pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3 xl:basis-1/4'
              >
                <Link
                  href={`/category/${item.description}`}
                  className='bg-primary/10 hover:bg-primary/15 relative flex h-full items-center gap-4 rounded-md px-4 py-3 transition-colors'
                >
                  <item.icon className='text-primary size-8 shrink-0' />
                  <p className='text-sm leading-4.5 font-medium'>{t(item.description)}</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </BaseLayout>
    </section>
  );
};
