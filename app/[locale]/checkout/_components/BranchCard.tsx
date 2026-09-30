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

// ============================ ESKI KOD ============================
// Avval alohida "Пункт самовывоза" kartasi edi (ichida Получатель ham bor edi).
// Endi filial DeliveryTypeSelector kartasi ichida, Получатель esa alohida kartada (RecipientBlock).
//
// export const BranchCard = () => {
//   const t = useTranslations();
//   const { deliveryType, branchId } = useCheckoutStore();
//   const getBranchesQuery = useQuery({
//     queryKey: ['branches'],
//     queryFn: () => getBranches()
//   });
//
//   if (deliveryType === DELIVERY_TYPE.Delivery) {
//     return null;
//   }
//
//   const branches = getBranchesQuery.data?.data.result.content;
//   const selectedBranch = branches?.find((branch) => branch.id === branchId);
//
//   return (
//     <Card variant='subtle'>
//       <CardHeader>
//         <CardTitle className='md:text-xl'>{t('Pickup point')}</CardTitle>
//       </CardHeader>
//       <CardContent className='space-y-3'>
//         <Card className='flex items-start' variant='plain'>
//           <div className='p-4 pr-0'>
//             <div className='bg-muted rounded-md p-2'>
//               <StoreIcon className='text-primary' />
//             </div>
//           </div>
//           {getBranchesQuery.isFetching ? (
//             ...skeleton...
//           ) : (
//             <CardHeader className='flex-1'>
//               <CardTitle className='font-semibold'>
//                 {selectedBranch?.name || t('Branch not selected')}
//               </CardTitle>
//               {selectedBranch ? (
//                 <CardDescription className='space-y-1'>
//                   <p className='flex items-center gap-1.5'>
//                     <MapPinIcon className='size-4 shrink-0' />
//                     {selectedBranch.location_name}
//                   </p>
//                   <p className='flex items-center gap-1.5'>
//                     <ClockIcon className='size-4 shrink-0' />
//                     {selectedBranch.working_hours}
//                   </p>
//                 </CardDescription>
//               ) : null}
//               <SelectBranchDialog asChild>
//                 <Button variant='muted'>
//                   {selectedBranch ? t('Choose another') : t('Select')}
//                 </Button>
//               </SelectBranchDialog>
//             </CardHeader>
//           )}
//         </Card>
//         <RecipientBlock />
//       </CardContent>
//     </Card>
//   );
// };
