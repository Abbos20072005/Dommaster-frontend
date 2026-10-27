import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { AuthWrapper } from '@/modules/auth';

import { ProProjectsOnly } from '../_components/ProProjectsOnly';
import { ProjectDetails } from '../_components/ProjectDetails';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Project') };
}

const ProjectPage = () => (
  <AuthWrapper>
    <ProProjectsOnly>
      <ProjectDetails />
    </ProProjectsOnly>
  </AuthWrapper>
);

export default ProjectPage;
