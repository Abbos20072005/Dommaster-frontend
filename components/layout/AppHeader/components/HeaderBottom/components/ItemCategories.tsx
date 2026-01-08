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
  onClose: () => void;
}

export const ItemCategories = ({ subCategory, onClose, categoryId }: Props) => {
  const accordionValue = `subcategory-${subCategory.id}`;
  const hasItemCategories = subCategory.product_item_categories?.length > 0;

  return (
    <div>
      <Accordion type='single' collapsible>
        <AccordionItem value={accordionValue}>
          <div className='flex justify-start gap-2'>
            {hasItemCategories && (
              <div>
                <AccordionTrigger className='hover:text-secondary p-0' />
              </div>
            )}
            <Link
              href={`/category/${categoryId}/${subCategory.id}`}
              className='text-sm'
              onClick={onClose}
            >
              <span className='hover:text-secondary font-semibold transition-colors'>
                {subCategory.name}
              </span>
            </Link>
          </div>
          {hasItemCategories && (
            <AccordionContent className='pb-0'>
              <ul className='mt-4 ml-6 space-y-4'>
                {subCategory.product_item_categories.map((itemCategory) => (
                  <li key={itemCategory.id}>
                    <Link
                      href={`/category/${categoryId}/${subCategory.id}/${itemCategory.id}`}
                      className='text-sm'
                      onClick={onClose}
                    >
                      <span className='hover:text-secondary transition-colors'>
                        {itemCategory.name}
                      </span>
                      <span className='text-muted-foreground ml-1'>
                        ({itemCategory.product_amount})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
