import { Link } from '@/i18n/routing';

interface Props {
  item: {
    id: number;
    title: string;
    children: {
      id: number;
      title: string;
      count: number;
    }[];
  };
}

export const CatalogChild = ({ item }: Props) => (
  <div key={item.id} className='inline-block'>
    <Link
      href={`catalog/${item.id}`}
      className='hover:text-primary mb-3 inline-block text-sm font-bold transition-colors'
    >
      <span>{item.title}</span>
    </Link>
    <div className='flex flex-col gap-2'>
      {item.children.map((subChild) => (
        <ul key={subChild.id} className='space-y-2'>
          <li className='text-lg font-medium'>
            <Link
              href={`catalog/${subChild.id}`}
              className='text-muted-foreground hover:text-primary text-sm transition-colors'
            >
              <p>
                {subChild.title}
                <span className='text-muted-foreground/50 ml-2.5'>{subChild.count}</span>
              </p>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  </div>
);
