'use client';

import { useQuery } from '@tanstack/react-query';
import { BoxIcon, FolderPlusIcon, MapPinIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { formatMoney, ProjectActions, ProjectFormDialog } from '@/modules/pro';
import { getProDashboard, getProProjects } from '@/utils/api/requests';

import { ProProjectsOnly } from './ProProjectsOnly';

const ProjectsContent = () => {
  const t = useTranslations();
  const [status, setStatus] = React.useState<ProProjectStatus>('active');

  const projectsQuery = useQuery({
    queryKey: ['pro', 'projects', status],
    staleTime: 0,
    queryFn: () => getProProjects({ status })
  });
  // the total spent on each project (one request for all of them)
  const dashboardQuery = useQuery({
    queryKey: ['pro', 'dashboard'],
    staleTime: 0,
    queryFn: () => getProDashboard()
  });

  const projects = projectsQuery.data?.data.result ?? [];
  const totals = new Map(
    (dashboardQuery.data?.data.result.projects ?? []).map((project) => [project.id, project.total])
  );

  const openButton = (
    <Button>
      <PlusIcon />
      {t('Open project')}
    </Button>
  );

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h1 className='hidden text-[32px] leading-[38px] font-bold tracking-tight md:block'>
          {t('My projects')}
        </h1>
        <ProjectFormDialog>{openButton}</ProjectFormDialog>
      </div>

      <Tabs value={status} onValueChange={(value) => setStatus(value as ProProjectStatus)}>
        <TabsList>
          <TabsTrigger value='active'>{t('Active')}</TabsTrigger>
          <TabsTrigger value='archived'>{t('Archive')}</TabsTrigger>
        </TabsList>
      </Tabs>

      {projectsQuery.isLoading && (
        <div className='grid gap-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className='h-28 w-full rounded-xl' key={index} />
          ))}
        </div>
      )}

      {projectsQuery.isError && (
        <div className='grid justify-items-center gap-2 py-12 text-center' role='alert'>
          <span className='text-lg font-bold'>{t('Could not load projects')}</span>
          <Button onClick={() => projectsQuery.refetch()}>{t('Try again')}</Button>
        </div>
      )}

      {projectsQuery.isSuccess && !projects.length && (
        <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
          <FolderPlusIcon className='text-primary size-10' />
          <span className='text-xl font-bold'>
            {status === 'active' ? t('Open your first project') : t('Archive is empty')}
          </span>
          {status === 'active' && (
            <>
              <span className='text-muted-foreground max-w-md text-sm'>
                {t('Projects empty text')}
              </span>
              <ProjectFormDialog>{openButton}</ProjectFormDialog>
            </>
          )}
        </div>
      )}

      <div className='grid gap-3'>
        {projects.map((project) => (
          <article
            className='border-border grid gap-3 rounded-xl border bg-white p-4 md:p-5'
            key={project.id}
          >
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div className='grid min-w-0 gap-1'>
                <Link
                  className='hover:text-primary text-lg leading-6 font-bold break-words transition-colors'
                  href={`/user/projects/${project.id}`}
                >
                  {project.name}
                </Link>
                {project.address && (
                  <span className='text-muted-foreground flex items-center gap-1.5 text-sm'>
                    <MapPinIcon className='size-4 shrink-0' />
                    {project.address}
                  </span>
                )}
              </div>
              <div className='text-right'>
                <span className='text-muted-foreground block text-[13px] leading-[18px]'>
                  {t('Spent on project')}
                </span>
                <span className='text-lg leading-6 font-bold whitespace-nowrap tabular-nums'>
                  {formatMoney(totals.get(project.id) ?? '0')}{' '}
                  <span className='text-sm'>{t('sum')}</span>
                </span>
              </div>
            </div>

            <div className={cn('text-muted-foreground flex flex-wrap items-center gap-x-4 text-sm')}>
              <span className='flex items-center gap-1.5'>
                <BoxIcon className='size-4' />
                {t('Project items count', { count: project.items_count })}
              </span>
              <span>{t('Project orders count', { count: project.orders_count })}</span>
            </div>

            <ProjectActions project={project} />
          </article>
        ))}
      </div>
    </>
  );
};

export const ProjectsList = () => (
  <ProProjectsOnly>
    <ProjectsContent />
  </ProProjectsOnly>
);
