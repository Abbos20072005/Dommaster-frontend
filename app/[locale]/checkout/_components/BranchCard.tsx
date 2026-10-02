'use client';

import { useQuery } from '@tanstack/react-query';
import { StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getBranches } from '@/utils/api/requests';
import { useCheckoutStore } from '@/utils/stores';

import { SelectBranchDialog } from './SelectBranchDialog';

// Olib ketish punkti — "Способ доставки" kartasi ichida ko'rsatiladigan ixcham blok
export const BranchAddress = () => {
  const t = useTranslations();
  const { branchId } = useCheckoutStore();
  const getBranchesQuery = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches()
  });

  const branches = getBranchesQuery.data?.data.result.content;
  const selectedBranch = branches?.find((branch) => branch.id === branchId);

  return (
    <div className='bg-background flex items-center gap-3 rounded-xl p-3'>
      <div className='bg-muted shrink-0 rounded-md p-2'>
        <StoreIcon className='text-primary size-5' />
      </div>
      <div className='min-w-0 flex-1'>
        {getBranchesQuery.isFetching ? (
          <div className='space-y-1.5'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3.5 w-3/4' />
          </div>
        ) : selectedBranch ? (
          <>
            <p className='truncate text-sm font-semibold'>{selectedBranch.name}</p>
            <p className='text-muted-foreground line-clamp-2 text-xs'>
              {selectedBranch.location_name}
              {selectedBranch.working_hours && ` · ${selectedBranch.working_hours}`}
            </p>
          </>
        ) : (
          <p className='text-muted-foreground text-sm'>{t('Branch not selected')}</p>
        )}
      </div>
      <SelectBranchDialog asChild>
        <Button className='shrink-0' size='sm' variant='primaryFlat'>
          {selectedBranch ? t('Change') : t('Select')}
        </Button>
      </SelectBranchDialog>
    </div>
  );
};
