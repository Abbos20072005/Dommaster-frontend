'use client';

import { useQuery } from '@tanstack/react-query';
import { StoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { getBranches } from '@/utils/api/requests';
import { useCheckoutStore } from '@/utils/stores';

import { BranchItem } from './BranchItem';

interface Props {
  onSave?: () => void;
}

export const BranchList = ({ onSave }: Props) => {
  const t = useTranslations();
  const { branchId, setBranchId } = useCheckoutStore();
  const getBranchesQuery = useQuery({
    queryKey: ['branches'],
    queryFn: () => getBranches()
  });

  const branches = getBranchesQuery.data?.data.result.content;

  const [currentBranchId, setCurrentBranchId] = React.useState<number | null>(branchId);

  const onSubmit = () => {
    if (!currentBranchId) return;
    setBranchId(currentBranchId);
    onSave?.();
  };

  if (getBranchesQuery.isFetching) {
    return (
      <div className='flex h-full w-full items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (branches?.length === 0) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 py-20'>
        <StoreIcon className='text-muted-foreground size-8' />
        <p className='text-muted-foreground text-sm'>{t('No branches available')}</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        <RadioGroup
          value={String(currentBranchId ?? '')}
          onValueChange={(value) => setCurrentBranchId(+value)}
        >
          {branches?.map((branch) => (
            <div key={branch.id} className='flex gap-2'>
              <RadioGroupItem
                className='mt-2 size-5'
                id={String(branch.id)}
                value={String(branch.id)}
              />
              <Label className='flex-1' htmlFor={String(branch.id)}>
                <BranchItem branch={branch} />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className='flex justify-end' onClick={onSubmit}>
        <Button disabled={!currentBranchId}>{t('Save')}</Button>
      </div>
    </div>
  );
};
