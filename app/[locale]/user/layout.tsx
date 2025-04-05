import React from 'react';

import { BaseLayout } from '@/components/layout';

import { SideNav } from './_components';

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout className='mt-2 px-0 md:mt-4'>
      <div className='gap-6 md:flex'>
        <SideNav />
        <main className='flex-1'>{children}</main>
      </div>
    </BaseLayout>
  );
};

export default UserLayout;
