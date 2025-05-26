import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getServiceById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const serviceResponse = await getServiceById({ id });
  const service = serviceResponse.data.result;

  return { title: service.name };
}

const ServicePage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const serviceResponse = await getServiceById({ id });
  const service = serviceResponse.data.result;

  return (
    <>
      <Breadcrumb className='mb-2 md:mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/services'>{t('Services')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{service.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mb-6 text-xl font-bold md:text-3xl lg:text-4xl'>{service.name}</h1>
      <div
        className='prose prose-sm md:prose-base max-w-max'
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
    </>
  );
};

export default ServicePage;
