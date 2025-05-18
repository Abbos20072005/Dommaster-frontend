import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { getServices } from '@/utils/api/requests';

import { MostSoldProductsSection, RecentlyViewedProducts } from './_components';

const ServicesLayout = async ({ children }: React.PropsWithChildren) => {
  const servicesResponse = await getServices();
  const services = servicesResponse.data.result || [];

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-8'>
        <div className='flex gap-4'>
          <aside className='hidden w-48 md:block lg:w-60'>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className='hover:bg-accent hover:text-accent-foreground -ml-4 block rounded-md px-4 py-2 text-sm font-medium'
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className='flex-1'>{children}</div>
        </div>
        <MostSoldProductsSection />
        <RecentlyViewedProducts />
      </BaseLayout>
    </div>
  );
};

export default ServicesLayout;
