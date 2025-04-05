import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { getProductById } from '@/utils/api/requests';
import { getQueryClient } from '@/utils/getQueryClient';

import { ProductBody, ProductHeader } from './-components';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <div className='lg:flex'>
          <div className='flex-1'>
            <ProductHeader />
            <ProductBody />
          </div>
          <div className='w-[270px]'>Cart</div>
        </div>
      </BaseLayout>
    </HydrationBoundary>
  );
};

export default ProductPage;
