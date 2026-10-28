import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { servicesIndexPage } from '@/content/services';
import { Link } from '@/i18n/navigation';

const contentOf = async () => servicesIndexPage[(await getLocale()) === 'uz' ? 'uz' : 'ru'];

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await contentOf();

  return { title: { absolute: title }, description };
}

/** The entrance to the service pages: an intro and a card for each of them (BLD-252). */
const ServicesPage = async () => {
  const t = await getTranslations();
  const { h1, intro, cards } = await contentOf();

  return (
    <>
      <Breadcrumb className='mb-2 md:mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{h1}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mb-3 text-xl font-bold md:text-3xl'>{h1}</h1>
      <p className='mb-6 max-w-3xl text-[15px] leading-7'>{intro}</p>
      <ul className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              className='border-border hover:border-primary hover:bg-primary/5 block h-full rounded-xl border p-4 transition-colors'
              href={card.href}
            >
              <h2 className='text-base font-bold'>{card.title}</h2>
              <p className='text-muted-foreground mt-1 text-sm leading-6'>{card.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ServicesPage;
