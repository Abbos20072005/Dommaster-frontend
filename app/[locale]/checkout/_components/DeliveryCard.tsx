'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getCustomerAddresses } from '@/utils/api/requests';

import { SelectAddressDialog } from './SelectAddressDialog';

// Yetkazib berish manzili — "Способ доставки" kartasi ichida ko'rsatiladigan ixcham blok
export const DeliveryAddress = () => {
  const t = useTranslations();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const defaultAddress = getAddressesQuery.data?.data.result.find((address) => address.is_default);

  return (
    <div className='bg-background flex items-center gap-3 rounded-xl p-3'>
      <div className='bg-muted shrink-0 rounded-md p-2'>
        <MapPinIcon className='text-primary size-5' />
      </div>
      <div className='min-w-0 flex-1'>
        {getAddressesQuery.isFetching ? (
          <div className='space-y-1.5'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3.5 w-3/4' />
          </div>
        ) : defaultAddress ? (
          <>
            <p className='truncate text-sm font-semibold'>{defaultAddress.name}</p>
            <p className='text-muted-foreground line-clamp-2 text-xs'>
              {defaultAddress.location_name}
            </p>
          </>
        ) : (
          <p className='text-muted-foreground text-sm'>{t('Delivery address not specified')}</p>
        )}
      </div>
      <SelectAddressDialog asChild>
        <Button className='shrink-0' size='sm' variant='primaryFlat'>
          {defaultAddress ? t('Change') : t('Select')}
        </Button>
      </SelectAddressDialog>
    </div>
  );
};

// ============================ ESKI KOD ============================
// Avval alohida "Адрес доставки" kartasi edi (ichida Получатель ham bor edi).
// Endi manzil DeliveryTypeSelector kartasi ichida, Получатель esa alohida kartada (RecipientBlock).
//
// export const DeliveryCard = () => {
//   const t = useTranslations();
//   const { deliveryType } = useCheckoutStore();
//   const getAddressesQuery = useQuery({
//     queryKey: ['customerAddresses'],
//     queryFn: () => getCustomerAddresses()
//   });
//
//   if (deliveryType === DELIVERY_TYPE.Pickup) {
//     return null;
//   }
//
//   const addresses = getAddressesQuery.data?.data.result;
//   const defaultAddress = addresses?.find((address) => address.is_default);
//
//   return (
//     <Card variant='subtle'>
//       <CardHeader>
//         <CardTitle className='md:text-xl'>{t('Delivery address')}</CardTitle>
//       </CardHeader>
//       <CardContent className='space-y-3'>
//         <Card className='flex items-start' variant='plain'>
//           <div className='p-4 pr-0'>
//             <div className='bg-muted rounded-md p-2'>
//               <TruckIcon className='text-primary' />
//             </div>
//           </div>
//           {getAddressesQuery.isFetching ? (
//             <CardHeader className='flex-1'>
//               <CardTitle className='font-semibold'>
//                 <Skeleton className='h-4 w-20' />
//               </CardTitle>
//               <CardDescription>
//                 <Skeleton className='h-5 w-3/4' />
//               </CardDescription>
//               <SelectAddressDialog asChild>
//                 <Skeleton className='h-11 w-full' />
//               </SelectAddressDialog>
//             </CardHeader>
//           ) : (
//             <CardHeader className='flex-1'>
//               <CardTitle className='font-semibold'>
//                 {defaultAddress?.name || t('Delivery address not specified')}
//               </CardTitle>
//               <CardDescription>{defaultAddress?.location_name}</CardDescription>
//               <SelectAddressDialog asChild>
//                 <Button variant='muted'>
//                   {defaultAddress ? t('Choose another') : t('Select')}
//                 </Button>
//               </SelectAddressDialog>
//             </CardHeader>
//           )}
//         </Card>
//         <RecipientBlock />
//       </CardContent>
//     </Card>
//   );
// };
