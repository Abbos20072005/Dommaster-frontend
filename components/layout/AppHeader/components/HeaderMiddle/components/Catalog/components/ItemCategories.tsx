import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Link } from '@/i18n/navigation';

interface Props {
  categoryId: number;
  subCategory: SubCategory;
}

export const ItemCategories = ({ subCategory, categoryId }: Props) => {
  return (
    <div key={subCategory.id}>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <div className='flex justify-start gap-2'>
            <div>
              <AccordionTrigger className='hover:text-secondary p-0' />
            </div>
            <Link href={`/category/${categoryId}/${subCategory.id}`} className='text-sm'>
              <span className='hover:text-secondary font-medium transition-colors'>
                {subCategory.title}
              </span>
              <span className='text-muted-foreground ml-1'>({subCategory.productQty})</span>
            </Link>
          </div>
          <AccordionContent className='pb-0'>
            <ul className='mt-4 ml-9 space-y-4'>
              {subCategory.product_item_categories.map((itemCategory) => (
                <li key={itemCategory.id}>
                  <Link
                    href={`/category/${categoryId}/${subCategory.id}/${itemCategory.id}`}
                    className='text-sm'
                  >
                    <span className='hover:text-secondary transition-colors'>
                      {itemCategory.title}
                    </span>
                    <span className='text-muted-foreground ml-1'>({itemCategory.productQty})</span>
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
