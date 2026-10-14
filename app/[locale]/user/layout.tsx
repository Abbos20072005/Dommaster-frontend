import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout } from '@/components/layout';

import { SideNav } from './_components';
import { SessionExpiredDialog } from './_components/SessionExpiredDialog';
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
    <BaseLayout className='px-0 md:mt-5'>
      <div className='items-start gap-8 md:flex'>
        <SideNav />
        {/* on a phone the page lies on a light grey background and the blocks are white */}
        <main className='bg-muted min-h-[70vh] min-w-0 flex-1 pb-6 md:min-h-0 md:bg-transparent md:pb-0'>
          {children}
        </main>
      </div>
      <SessionExpiredDialog />
    </BaseLayout>
  );
};

export default UserLayout;
