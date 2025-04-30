import { useTranslations } from 'next-intl';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { ReviewsList } from './_components/ReviewsList';

const ReviewsPage = () => {
  const t = useTranslations();

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-6 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('Reviews')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl'>{t('Reviews')}</h1>
        <ReviewsList />
      </BaseLayout>
    </div>
  );
};

export default ReviewsPage;
