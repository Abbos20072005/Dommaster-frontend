import { EditIcon, ListChecksIcon, LogOutIcon, UserCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import { formatPhoneNumber } from '@/lib/utils';
import { useAuth } from '@/utils/stores';

interface Props extends React.ComponentProps<typeof DropdownMenuTrigger> {}

export const NavUser = ({ ...props }: Props) => {
  const t = useTranslations();
  const { user, reset } = useAuth();
  const [open, setOpen] = React.useState(false);

  const onLogout = () => {
    reset();
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger {...props} />
      {user && (
        <DropdownMenuContent align='end' className='w-56' sideOffset={-3}>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>{user.full_name}</p>
              <p className='text-muted-foreground text-xs leading-none'>
                {formatPhoneNumber(user.phone_number)}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/user/dashboard'>
                <UserCircleIcon />
                {t('My cabinet')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/user/personal-info'>
                <EditIcon />
                {t('Personal info')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/user//orders/all'>
                <ListChecksIcon />
                {t('My orders')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <LogOutIcon />
            {t('Logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
