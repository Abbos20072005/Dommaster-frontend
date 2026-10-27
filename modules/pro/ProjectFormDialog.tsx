'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trackEvent } from '@/lib/analytics';
import { patchProProject, postProProject } from '@/utils/api/requests';

import { getApiError } from './apiError';

const NAME_MIN = 3;
const NAME_MAX = 100;

interface Props {
  /** given: the project is edited; not given: a new one is opened */
  project?: ProProject;
  children: React.ReactNode;
  onSaved?: (project: ProProject) => void;
}

/** "Open a project" / "Edit the project": the name is required (3-100), the rest is optional. */
export const ProjectFormDialog = ({ project, children, onSaved }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (!open) return;
    setName(project?.name ?? '');
    setAddress(project?.address ?? '');
    setComment(project?.comment ?? '');
    setError('');
  }, [open, project]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim().replace(/\s+/g, ' ');
    if (cleanName.length < NAME_MIN || cleanName.length > NAME_MAX) {
      setError(t('Project name length', { min: NAME_MIN, max: NAME_MAX }));
      return;
    }

    setPending(true);
    setError('');
    const data = { name: cleanName, address: address.trim(), comment: comment.trim() };
    try {
      const response = project
        ? await patchProProject({ id: project.id, data })
        : await postProProject({ data });
      if (!project) trackEvent('pro_project_created');
      await queryClient.invalidateQueries({ queryKey: ['pro'] });
      toast.success(project ? t('Project saved') : t('Project created'));
      setOpen(false);
      onSaved?.(response.data.result);
    } catch (caught) {
      const { code } = getApiError(caught);
      // 35: an active project with this name exists
      if (code === 35) setError(t('errorMessages.35'));
      else toast.error(code ? t(`errorMessages.${code}`) : t('errorMessages.default'));
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form className='grid gap-4' onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>{project ? t('Edit project') : t('Open project')}</DialogTitle>
            <DialogDescription>{t('Project form hint')}</DialogDescription>
          </DialogHeader>

          <div className='grid gap-1.5'>
            <Label htmlFor='project-name'>{t('Project name')}</Label>
            <Input
              aria-invalid={!!error}
              autoComplete='off'
              id='project-name'
              maxLength={NAME_MAX + 20}
              placeholder={t('Project name placeholder')}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError('');
              }}
            />
            {error && (
              <span className='text-destructive text-[13px] leading-[18px]' role='alert'>
                {error}
              </span>
            )}
          </div>

          <div className='grid gap-1.5'>
            <Label htmlFor='project-address'>{t('Project address')}</Label>
            <Input
              autoComplete='off'
              id='project-address'
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className='grid gap-1.5'>
            <Label htmlFor='project-comment'>{t('Project comment')}</Label>
            <Textarea
              id='project-comment'
              rows={3}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>

          <DialogFooter>
            <Button isLoading={pending} type='submit'>
              {t('Save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
