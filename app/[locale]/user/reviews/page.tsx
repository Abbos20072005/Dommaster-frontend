import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { ReviewsTabs } from './_components/ReviewsTabs/ReviewsTabs';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My reviews and questions') };
}

const ReviewsPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('My reviews and questions')}</h1>
      </div>
      <div className='grid gap-5 px-4 md:px-0'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('My reviews and questions')}
        </h1>
        <ReviewsTabs />
      </div>
    </AuthWrapper>
  );
};

export default ReviewsPage;
