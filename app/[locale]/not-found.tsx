import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

const NotFound = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center py-10'>
      <div className='bg-accent/50 flex w-full flex-col items-center space-y-5 rounded-md border p-6 backdrop-blur-md sm:p-14 md:max-w-[700px] md:p-20'>
        <h1 className='text-7xl font-extrabold md:text-9xl'>404</h1>
        <h2 className='text-center text-2xl font-bold uppercase md:text-3xl'>
          Opps! page not found
        </h2>
        <p className='text-center'>
          Sorry, the page you are looking for doesn&apos;t exist. If you think something is broken,
          report a problem.
        </p>
        <div className='flex w-full flex-col gap-4 sm:flex-row sm:justify-center'>
          <Button asChild className='uppercase'>
            <Link href='/'>back to home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
