import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout } from '@/components/layout';

import { SideNav } from './_components';
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      default: t('metadata.user.title.default'),
      template: `%s - ${t('metadata.user.title.template')}`
    },
    robots: { index: false, follow: false }
  };
}

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout className='px-0 md:mt-4'>
      <div className='gap-6 md:flex'>
        <SideNav />
        <main className='flex-1'>{children}</main>
      </div>
    </BaseLayout>
  );
};

export default UserLayout;
