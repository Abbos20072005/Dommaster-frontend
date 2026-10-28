import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { orNotFound } from '@/lib/orNotFound';
import { withMainPhone } from '@/lib/phone';
import { getServiceById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * A service that does not exist is a 404, not a 500 (BLD-352): an address that is not a number
 * (`/services/delivery`) never reaches the API, an unknown number is a 4xx answer of it.
 */
const getService = async (id: string) => {
  if (!/^\d+$/.test(id)) notFound();

  const service = (await orNotFound(getServiceById({ id }))).data.result;

  // an unknown number is not always a 4xx: the API may answer 200 with an empty service
  if (!service?.name) notFound();

  return service;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);

  return { title: service.name };
}

const ServicePage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const service = await getService(id);

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
        dangerouslySetInnerHTML={{ __html: withMainPhone(service.description) }}
      />
    </>
  );
};

export default ServicePage;
