import { FilterIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Filter } from '@/modules/filter';

interface Props {
  filters: Filter[];
  hideCategories?: boolean;
}

export const MobileFilterDrawer = ({ filters, hideCategories }: Props) => {
  const t = useTranslations();

  return (
    <Drawer fadeFromIndex={0} snapPoints={[1]}>
      <DrawerTrigger asChild>
        <Button className='lg:hidden' size='sm' variant='outline'>
          <FilterIcon />
          Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent className='mx-auto !max-h-dvh w-full max-w-xl'>
        <DrawerHeader className='py-2'>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <div className='overflow-y-auto px-4 py-2'>
          <Filter filters={filters} hideCategories={hideCategories} />
        </div>
        <DrawerFooter className='py-2'>
          <DrawerClose asChild>
            <Button className='uppercase'>{t('View results')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
