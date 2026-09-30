'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ reset }: Props) => {
  const t = useTranslations();

  return (
    <div className='flex w-full flex-col items-center justify-center py-10'>
      <div className='bg-accent/50 flex w-full flex-col items-center space-y-5 rounded-md border p-6 backdrop-blur-md sm:p-14 md:max-w-[700px] md:p-20'>
        <h2 className='text-center text-2xl font-bold uppercase md:text-3xl'>
          {t('Oops! Something went wrong!')}
        </h2>
        <p className='text-center'>{t('Error page description')}</p>
        <div className='grid grid-cols-2 gap-3'>
          <Button className='uppercase' variant='outline' onClick={reset}>
            {t('Retry')}
          </Button>
          <Button asChild className='uppercase'>
            <Link href='/'>{t('Go home')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
