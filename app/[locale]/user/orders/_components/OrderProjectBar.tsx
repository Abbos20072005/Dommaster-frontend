'use client';

import { FolderInputIcon, FolderMinusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ProjectSelectDialog, useProLink } from '@/modules/pro';

interface Props {
  orderId: number;
  /** the ids of the order items the customer ticked */
  selected: number[];
  linker: ReturnType<typeof useProLink>;
  onDone: () => void;
}

/**
 * PRO: link the whole order to a project, or only the ticked items (an order can hold goods for
 * two houses), or take the ticked items out of their project.
 */
export const OrderProjectBar = ({ orderId, selected, linker, onDone }: Props) => {
  const t = useTranslations();
  const hasSelection = selected.length > 0;

  return (
    <div className='bg-muted grid gap-2 rounded-lg p-3'>
      <span className='text-[13px] leading-[18px] text-[#4A5563]'>{t('Order projects hint')}</span>
      <div className='flex flex-wrap gap-2'>
        <ProjectSelectDialog
          title={t('Link whole order')}
          onSelect={async (project) => {
            if (await linker.link(orderId, project.id)) onDone();
          }}
        >
          <Button isLoading={linker.pending} size='sm' variant={hasSelection ? 'outline' : 'default'}>
            <FolderInputIcon />
            {t('Link whole order')}
          </Button>
        </ProjectSelectDialog>

        {hasSelection && (
          <>
            <ProjectSelectDialog
              title={t('Link selected items')}
              onSelect={async (project) => {
                if (await linker.link(orderId, project.id, selected)) onDone();
              }}
            >
              <Button isLoading={linker.pending} size='sm'>
                <FolderInputIcon />
                {t('Link selected items')} ({selected.length})
              </Button>
            </ProjectSelectDialog>
            <Button
              isLoading={linker.pending}
              size='sm'
              variant='outline'
              onClick={async () => {
                if (await linker.unlink(orderId, selected)) onDone();
              }}
            >
              <FolderMinusIcon />
              {t('Remove from project')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
