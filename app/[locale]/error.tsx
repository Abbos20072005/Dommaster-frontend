'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  return (
    <div className='flex w-full flex-col items-center justify-center py-10'>
      <div className='bg-accent/50 flex w-full flex-col items-center space-y-5 rounded-md border p-6 backdrop-blur-md sm:p-14 md:max-w-[700px] md:p-20'>
        <h2 className='text-center text-2xl font-bold uppercase md:text-3xl'>
          Opps! Something went wrong!
        </h2>
        {error.message && <p className='text-center'>{error.message}</p>}
        <p className='text-center'>
          Sorry, the request could not be processed. If you think something is broken, report a
          problem.
        </p>
        <div className='grid grid-cols-2 gap-3'>
          <Button className='uppercase' variant='outline' onClick={reset}>
            Retry
          </Button>
          <Button asChild className='uppercase'>
            <Link href='/'>go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
