'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getAddsBrands } from '@/utils/api/requests';

import { AddsBrandsSectionLoading } from './AddsBrandsSectionLoading';

export const AddsBrandsSection = () => {
  const t = useTranslations();
  const getAddsBrandsQuery = useQuery({
    queryKey: ['addsBrands'],
    staleTime: 0,
    queryFn: () => getAddsBrands()
  });

  const addsBrands = getAddsBrandsQuery.data?.data.result || [];

  if (getAddsBrandsQuery.isLoading) return <AddsBrandsSectionLoading />;

  if (!addsBrands.length) return null;

  return addsBrands.map((brand) => (
    <section key={brand.id}>
      <BaseLayout>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-lg font-bold md:text-2xl'>{brand.name}</h2>
          <Button asChild size='sm' variant='muted'>
            <Link href={`/brand/${brand.id}`} scroll>
              {t('View all')}
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <ProductList products={brand.products} />
      </BaseLayout>
    </section>
  ));
};

// 'use client';
//
// import { useQuery } from '@tanstack/react-query';
// import { ArrowRightIcon } from 'lucide-react';
// import { useTranslations } from 'next-intl';
// import Image from 'next/image';
//
// import { BaseLayout } from '@/components/layout';
// import { ProductList } from '@/components/modules/product';
// import { Button } from '@/components/ui/button';
// import { Link } from '@/i18n/navigation';
// import { getWidgets } from '@/utils/api/requests';
//
// import { AddsBrandsSectionLoading } from './AddsBrandsSectionLoading';
//
// export const AddsBrandsSection = () => {
//   const t = useTranslations();
//   const getWidgetsQuery = useQuery({
//     queryKey: ['widgets'],
//     staleTime: 0,
//     queryFn: () => getWidgets()
//   });
//
//   const widgets = getWidgetsQuery.data?.data || [];
//   console.log(widgets);
//
//   if (getWidgetsQuery.isLoading) return <AddsBrandsSectionLoading />;
//
//   if (!widgets.length) return null;
//
//   return widgets.map((item) => (
//     <section key={item.data.id}>
//       <BaseLayout>
//         {item.type === 'addsbrands' ? (
//           <>
//             <div className='flex items-center justify-between gap-3'>
//               <h2 className='text-lg font-bold md:text-2xl'>{item.data.name}</h2>
//               <Button asChild size='sm' variant='muted'>
//                 <Link href={`/brand/${item.data.id}`} scroll>
//                   {t('View all')}
//                   <ArrowRightIcon />
//                 </Link>
//               </Button>
//             </div>
//             <ProductList products={item.data.products} />
//           </>
//         ) : item.type === 'banner' ? (
//           <a
//             href={item.data.link}
//             className='block aspect-[3/1] md:aspect-[4/1]'
//             rel='noreferrer noopenner'
//             target='_blank'
//           >
//             <Image
//               alt='banner'
//               className='size-full rounded-lg object-cover md:hidden md:rounded-xl'
//               height={230}
//               src={item.data.mobile_image}
//               width={690}
//             />
//             <Image
//               alt='banner'
//               className='hidden size-full rounded-lg object-cover md:block md:rounded-xl'
//               height={413}
//               src={item.data.desktop_image}
//               width={1240}
//             />
//           </a>
//         ) : null}
//       </BaseLayout>
//     </section>
//   ));
// };
