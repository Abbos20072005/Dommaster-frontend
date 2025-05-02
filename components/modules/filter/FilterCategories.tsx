'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { useFilter } from '@/components/modules/filter/useFilter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getCategories } from '@/utils/api/requests';

export const FilterCategories = () => {
  const { filter } = useFilter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const categories = getCategoriesQuery.data?.data.result;

  return (
    <Accordion type='single' collapsible>
      {categories?.map((category) => (
        <AccordionItem key={category.id} className='border-none' value={String(category.id)}>
          <AccordionTrigger className='py-2'>{category.name}</AccordionTrigger>
          <AccordionContent className='ml-2'>
            <Accordion type='single' collapsible>
              {category.sub_categories.map((subCategory) => (
                <AccordionItem
                  key={subCategory.id}
                  className='border-none'
                  value={String(subCategory.id)}
                >
                  <AccordionTrigger className='py-2'>{subCategory.name}</AccordionTrigger>
                  <AccordionContent className='ml-2'>
                    <ul className='space-y-4 pt-3'>
                      {subCategory.product_item_categories.map((itemCategory) => (
                        <RadioGroup
                          key={itemCategory.id}
                          value={String(filter.item_category)}
                          onValueChange={() =>
                            router.push({
                              pathname,
                              query: {
                                ...Object.fromEntries(searchParams),
                                item_category: itemCategory.id
                              }
                            })
                          }
                        >
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem
                              className={cn(
                                'hover:text-secondary block text-sm text-nowrap transition-colors',
                                itemCategory.id === filter.item_category &&
                                  'text-secondary font-medium'
                              )}
                              id={String(itemCategory.id)}
                              value={String(itemCategory.id)}
                            />
                            <Label htmlFor={String(itemCategory.id)}>{itemCategory.name}</Label>
                          </div>
                        </RadioGroup>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
