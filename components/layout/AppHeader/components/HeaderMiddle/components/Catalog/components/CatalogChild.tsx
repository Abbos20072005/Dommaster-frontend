import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Link } from '@/i18n/navigation';

interface Props {
  item: Catalog;
}

export const CatalogChild = ({ item }: Props) => {
  if (item.children.length === 0) {
    return (
      <div key={item.id} className='ml-6'>
        <Link href={`/catalog/${item.id}`} className='text-sm'>
          <span className='hover:text-secondary font-medium transition-colors'>{item.title}</span>
          <span className='text-muted-foreground ml-1'>({item.productQty})</span>
        </Link>
      </div>
    );
  }

  return (
    <div key={item.id}>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <div className='flex justify-start gap-2'>
            <div>
              <AccordionTrigger className='hover:text-secondary p-0' />
            </div>
            <Link href={`/catalog/${item.id}`} className='text-sm'>
              <span className='hover:text-secondary font-medium transition-colors'>
                {item.title}
              </span>
              <span className='text-muted-foreground ml-1'>({item.productQty})</span>
            </Link>
          </div>
          <AccordionContent className='pb-0'>
            <ul className='mt-4 ml-9 space-y-4'>
              {item.children.map((subChild) => (
                <li key={subChild.id}>
                  <Link href={`/catalog/${subChild.id}`} className='text-sm'>
                    <span className='hover:text-secondary transition-colors'>{subChild.title}</span>
                    <span className='text-muted-foreground ml-1'>({subChild.productQty})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
