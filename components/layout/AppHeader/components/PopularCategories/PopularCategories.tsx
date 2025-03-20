import { Link } from '@/i18n/routing';

export const PopularCategories = () => {
  return (
    <nav className='flex h-5 flex-wrap justify-between gap-2 overflow-clip'>
      {Array.from({ length: 12 }).map((_, i) => (
        <Link
          href='#'
          key={i}
          className='hover:text-primary truncate text-sm text-nowrap transition-colors'
        >
          <span>Category {i + 1}</span>
        </Link>
      ))}
    </nav>
  );
};
