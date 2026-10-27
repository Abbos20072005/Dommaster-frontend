'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ArchiveIcon, ArchiveRestoreIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import {
  deleteProProject,
  postProProjectArchive,
  postProProjectRestore
} from '@/utils/api/requests';

import { getApiError } from './apiError';
import { ProjectFormDialog } from './ProjectFormDialog';

interface Props {
  project: ProProject;
  /** called after the project is deleted (the project page goes back to the list) */
  onDeleted?: () => void;
}

/** Edit, archive / restore and (only an empty project) delete. */
export const ProjectActions = ({ project, onDeleted }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [pending, setPending] = React.useState(false);
  const isArchived = project.status === 'archived';

  const run = async (action: () => Promise<unknown>, message: string, event?: string) => {
    setPending(true);
    try {
      await action();
      if (event) trackEvent(event);
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: ['pro'] });
      return true;
    } catch (error) {
      const { code } = getApiError(error);
      // 36: the project has linked items: it can only be archived
      toast.error(code ? t(`errorMessages.${code}`) : t('errorMessages.default'));
      return false;
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <ProjectFormDialog project={project}>
        <Button size='sm' variant='outline'>
          <PencilIcon />
          {t('Edit')}
        </Button>
      </ProjectFormDialog>

      {isArchived ? (
        <Button
          isLoading={pending}
          size='sm'
          variant='outline'
          onClick={() =>
            run(() => postProProjectRestore({ id: project.id }), t('Project restored'))
          }
        >
          <ArchiveRestoreIcon />
          {t('Restore from archive')}
        </Button>
      ) : (
        <Button
          isLoading={pending}
          size='sm'
          variant='outline'
          onClick={() =>
            run(
              () => postProProjectArchive({ id: project.id }),
              t('Project archived'),
              'pro_project_archived'
            )
          }
        >
          <ArchiveIcon />
          {t('Archive')}
        </Button>
      )}

      {/* only a project with nothing linked can be deleted; the others are archived */}
      {project.items_count === 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='sm' variant='ghostDestructive'>
              <Trash2Icon />
              {t('Delete')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
                {t('Delete project question', { name: project.name })}
              </AlertDialogTitle>
              <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
                {t('Delete project text')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='h-11 px-5'>{t('Cancel')}</AlertDialogCancel>
              <Button
                className='h-11 px-5'
                isLoading={pending}
                variant='destructive'
                onClick={async () => {
                  const done = await run(
                    () => deleteProProject({ id: project.id }),
                    t('Project deleted')
                  );
                  if (done) onDeleted?.();
                }}
              >
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
