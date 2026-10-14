import { useMutation } from '@tanstack/react-query';
import { MapPinIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AddressSelectDialog } from '@/modules/location';
import { deleteCustomerAddress } from '@/utils/api/requests';

interface Props {
  address: Address;
}

export const AddressItem = ({ address }: Props) => {
  const t = useTranslations();
  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteAddressMutation = useMutation({
    mutationFn: deleteCustomerAddress,
    meta: {
      invalidatesQuery: ['customerAddresses']
    }
  });

  const onDeleteAddress = () => {
    deleteAddressMutation.mutate({ id: address.id });
    setOpenDelete(false);
  };

  return (
    <article className='border-border grid content-start gap-4 rounded-xl border bg-white p-5 pb-3'>
      <div className='flex items-start gap-3.5'>
        <span className='bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full'>
          <MapPinIcon className='size-5' />
        </span>
        <div className='grid min-w-0 flex-1 gap-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-[17px] leading-6 font-bold'>{address.name}</span>
            {address.is_default && (
              <span className='inline-flex h-[22px] items-center rounded-full bg-[#E8F5EE] px-2.5 text-xs font-bold text-[#0E7C3E]'>
                {t('Default address')}
              </span>
            )}
          </div>
          <p className='text-sm leading-5 text-[#4A5563]'>{address.location_name}</p>
        </div>
      </div>

      <div className='-ml-3 flex gap-1'>
        <AddressSelectDialog asChild defaultValues={address}>
          <Button className='text-primary hover:bg-primary/5' size='sm' variant='ghost'>
            <PencilIcon />
            {t('Edit')}
          </Button>
        </AddressSelectDialog>
        <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
          <AlertDialogTrigger asChild>
            <Button
              className='text-[#4A5563] hover:bg-[#FDECEC] hover:text-[#C0211D]'
              size='sm'
              variant='ghost'
            >
              <TrashIcon />
              {t('Delete')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className='bg-destructive/15 rounded-xl p-2'>
                <TrashIcon className='text-destructive size-8' />
              </div>
              <AlertDialogTitle>{t('Delete address')}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
              <Button
                size='sm'
                variant='destructive'
                isLoading={deleteAddressMutation.isPending}
                onClick={onDeleteAddress}
              >
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
};
