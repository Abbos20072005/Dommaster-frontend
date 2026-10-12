import { BaseLayout, MobileHeader } from '@/components/layout';

import { CollectionList } from './_components/CollectionList';

const CollectionPage = () => (
  <div>
    <MobileHeader />
    <BaseLayout className='mt-2 md:mt-4'>
      <CollectionList />
    </BaseLayout>
  </div>
);

export default CollectionPage;
