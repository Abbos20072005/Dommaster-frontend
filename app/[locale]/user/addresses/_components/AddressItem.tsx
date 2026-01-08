import { useMutation } from '@tanstack/react-query';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card key={address.id} variant='outline'>
      <CardHeader className='flex-row items-center p-4 pb-2'>
        <CardTitle className='flex-1 md:text-xl'>{address.name}</CardTitle>
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
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <p className='text-muted-foreground text-sm'>{address.location_name}</p>
      </CardContent>
    </Card>
  );
};
