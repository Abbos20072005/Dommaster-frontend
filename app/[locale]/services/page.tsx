import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { getServices } from '@/utils/api/requests';

const ServicesPage = async () => {
  const t = await getTranslations();
  const servicesResponse = await getServices();
  const services = servicesResponse.data.result || [];

  return (
    <>
      <Breadcrumb className='mb-2 md:mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('Services')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mb-6 text-xl font-bold md:text-3xl'>{t('Services')}</h1>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 md:gap-8'>
        {services.map((service) => (
          <Link
            href={`/services/${service.id}`}
            key={service.id}
            className='group flex flex-col items-center text-center'
          >
            <div className='bg-muted group-hover:bg-primary/20 flex size-25 items-center justify-center rounded-md transition-colors'>
              <Image alt={service.name} height={56} src={service.icon} width={56} />
            </div>
            <p className='mt-2 text-sm font-medium'>{service.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ServicesPage;
