import { format } from 'date-fns';
import { getTranslations } from 'next-intl/server';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getNewsById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

const NewsPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const newsResponse = await getNewsById({ id });
  const news = newsResponse.data.result;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 max-w-4xl space-y-6 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/news'>{t('News')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl lg:text-4xl'>{news.title}</h1>
        <p className='text-muted-foreground text-sm'>{format(news.created_at, 'dd.MM.yyyy')}</p>
        <div
          className='prose prose-sm md:prose-base max-w-max'
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
      </BaseLayout>
    </div>
  );
};

export default NewsPage;
