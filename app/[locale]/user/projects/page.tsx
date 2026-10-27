import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { MobilePageHeader } from '@/app/[locale]/user/_components/MobilePageHeader';
import { AuthWrapper } from '@/modules/auth';

import { ProjectsList } from './_components/ProjectsList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My projects') };
}

const ProjectsPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <MobilePageHeader title={t('My projects')} />
      <div className='grid grid-cols-[minmax(0,1fr)] gap-5 px-4 md:px-0'>
        <ProjectsList />
      </div>
    </AuthWrapper>
  );
};

export default ProjectsPage;
