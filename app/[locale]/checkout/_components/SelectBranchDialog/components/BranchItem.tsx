import { ClockIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  branch: Branch;
}

export const BranchItem = ({ branch, ...props }: Props) => {
  const t = useTranslations();

  return (
    <div {...props}>
      <h2 className='mb-1 font-medium md:text-lg'>{branch.name}</h2>
      <div className='space-y-1'>
        <p className='text-muted-foreground flex items-start gap-1.5 text-sm'>
          <MapPinIcon className='mt-0.5 size-4 shrink-0' />
          {branch.location_name}
        </p>
        <p className='text-muted-foreground flex items-center gap-1.5 text-sm'>
          <ClockIcon className='size-4 shrink-0' />
          {t('Working hours')}: {branch.working_hours}
        </p>
        {branch.phone_number && (
          <a
            className='text-secondary flex items-center gap-1.5 text-sm'
            href={`tel:${branch.phone_number}`}
          >
            <PhoneIcon className='size-4 shrink-0' />
            {branch.phone_number}
          </a>
        )}
      </div>
    </div>
  );
};
