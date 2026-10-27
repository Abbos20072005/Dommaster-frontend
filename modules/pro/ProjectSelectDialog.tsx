'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getProProjects } from '@/utils/api/requests';

import { ProjectFormDialog } from './ProjectFormDialog';

interface Props {
  children: React.ReactNode;
  title: string;
  /** called with the chosen (or just opened) project; the dialog closes after it */
  onSelect: (project: ProProject) => void | Promise<unknown>;
}

/** The list of the active projects to choose from, and "+ Open a project" at the bottom. */
export const ProjectSelectDialog = ({ children, title, onSelect }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  const projectsQuery = useQuery({
    queryKey: ['pro', 'projects', 'active'],
    enabled: open,
    staleTime: 0,
    queryFn: () => getProProjects({ status: 'active' })
  });
  const projects = projectsQuery.data?.data.result ?? [];

  const choose = async (project: ProProject) => {
    setOpen(false);
    await onSelect(project);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{t('Choose project hint')}</DialogDescription>
        </DialogHeader>

        <div className='grid max-h-[50vh] gap-2 overflow-y-auto'>
          {projectsQuery.isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className='h-14 w-full rounded-lg' key={index} />
            ))}
          {!projectsQuery.isLoading && !projects.length && (
            <p className='text-muted-foreground py-2 text-sm'>{t('No active projects')}</p>
          )}
          {projects.map((project) => (
            <button
              className='border-border hover:bg-muted grid gap-0.5 rounded-lg border px-3.5 py-2.5 text-left transition-colors'
              key={project.id}
              type='button'
              onClick={() => choose(project)}
            >
              <span className='text-[15px] leading-5 font-bold'>{project.name}</span>
              {project.address && (
                <span className='text-muted-foreground text-[13px] leading-[18px]'>
                  {project.address}
                </span>
              )}
            </button>
          ))}
        </div>

        <ProjectFormDialog onSaved={choose}>
          <Button className='w-full' type='button' variant='outline'>
            <PlusIcon />
            {t('Open project')}
          </Button>
        </ProjectFormDialog>
      </DialogContent>
    </Dialog>
  );
};
