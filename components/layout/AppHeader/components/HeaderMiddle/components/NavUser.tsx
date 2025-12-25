import { EditIcon, ListChecksIcon, LogOutIcon, MapPinIcon, UserCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link, useRouter } from '@/i18n/navigation';
import { formatPhoneNumber } from '@/lib/utils';
import { useAuth } from '@/modules/auth';

interface Props extends React.ComponentProps<typeof DropdownMenuTrigger> {}

export const NavUser = ({ ...props }: Props) => {
  const t = useTranslations();
  const { user, reset } = useAuth();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const onLogout = () => {
    reset();
    router.refresh();
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger {...props} />
      {user && (
        <DropdownMenuContent align='end' className='w-56' sideOffset={-3}>
          <DropdownMenuItem asChild className='items-start gap-0 font-normal'>
            <Link href='/user/dashboard' className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>{user.full_name}</p>
              <p className='text-muted-foreground text-xs leading-none'>
                {formatPhoneNumber(user.phone_number)}
              </p>
            </Link>
          </DropdownMenuItem>
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
              <Link href='/user/orders/active'>
                <ListChecksIcon />
                {t('My orders')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/user/addresses'>
                <MapPinIcon />
                {t('My addresses')}
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
