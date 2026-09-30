'use client';

import { useQuery } from '@tanstack/react-query';
import { ClockIcon, MapPinIcon, StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getBranches } from '@/utils/api/requests';
import { DELIVERY_TYPE } from '@/utils/constants';
import { useCheckoutStore } from '@/utils/stores';

import { SelectBranchDialog } from './SelectBranchDialog';

export const BranchCard = () => {
  const t = useTranslations();
  const { deliveryType, branchId } = useCheckoutStore();
  const getBranchesQuery = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches()
  });

  if (deliveryType === DELIVERY_TYPE.Delivery) {
    return null;
  }

  const branches = getBranchesQuery.data?.data.result.content;
  const selectedBranch = branches?.find((branch) => branch.id === branchId);

  return (
    <Card variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Pickup point')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Card className='flex items-start' variant='outline'>
          <div className='p-4 pr-0'>
            <div className='bg-muted rounded-md p-2'>
              <StoreIcon className='text-secondary' />
            </div>
          </div>
          {getBranchesQuery.isFetching ? (
            <CardHeader className='flex-1'>
              <CardTitle className='font-semibold'>
                <Skeleton className='h-4 w-20' />
              </CardTitle>
              <CardDescription>
                <Skeleton className='h-5 w-3/4' />
              </CardDescription>
              <SelectBranchDialog asChild>
                <Skeleton className='h-11 w-full' />
              </SelectBranchDialog>
            </CardHeader>
          ) : (
            <CardHeader className='flex-1'>
              <CardTitle className='font-semibold'>
                {selectedBranch?.name || t('Branch not selected')}
              </CardTitle>
              {selectedBranch ? (
                <CardDescription className='space-y-1'>
                  <p className='flex items-center gap-1.5'>
                    <MapPinIcon className='size-4 shrink-0' />
                    {selectedBranch.location_name}
                  </p>
                  <p className='flex items-center gap-1.5'>
                    <ClockIcon className='size-4 shrink-0' />
                    {selectedBranch.working_hours}
                  </p>
                </CardDescription>
              ) : null}
              <SelectBranchDialog asChild>
                <Button variant='muted'>
                  {selectedBranch ? t('Choose another') : t('Select')}
                </Button>
              </SelectBranchDialog>
            </CardHeader>
          )}
        </Card>
      </CardContent>
    </Card>
  );
};
