import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditIcon, TrashIcon } from 'lucide-react';
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
import { Spinner } from '@/components/ui/spinner';
import { AddressSelectDialog } from '@/modules/location';
import { deleteCustomerAddress } from '@/utils/api/requests';

interface Props extends React.ComponentProps<'div'> {
  address: Address;
}

export const AddressItem = ({ address, ...props }: Props) => {
  const t = useTranslations();
  const [openDelete, setOpenDelete] = React.useState(false);
  const deleteAddressMutation = useMutation({
    mutationFn: deleteCustomerAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerAddresses'] });
    }
  });

  const queryClient = useQueryClient();

  const onDeleteAddress = () => {
    deleteAddressMutation.mutate({ id: address.id });
    setOpenDelete(false);
  };

  return (
    <div key={address.id} {...props}>
      <div className='mb-2 flex flex-row items-center gap-2'>
        <h2 className='flex-1 md:text-lg'>{address.name}</h2>
        <AddressSelectDialog asChild defaultValues={address}>
          <Button size='iconSm' variant='outline'>
            <EditIcon />
          </Button>
        </AddressSelectDialog>
        <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
          <AlertDialogTrigger asChild>
            <Button size='iconSm' variant='outline'>
              <TrashIcon />
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
                disabled={deleteAddressMutation.isPending}
                size='sm'
                variant='destructive'
                onClick={onDeleteAddress}
              >
                <Spinner show={deleteAddressMutation.isPending} />
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div>
        <p className='text-muted-foreground text-sm'>{address.location_name}</p>
      </div>
    </div>
  );
};
