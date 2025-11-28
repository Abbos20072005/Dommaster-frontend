import { MessageSquareTextIcon, PhoneCallIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { LocaleSwitcher } from '@/components/layout/AppHeader/components/HeaderTop/components';
import { ChatDialog } from '@/components/modules/chat';
import { MobileSearch } from '@/components/modules/search';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export const MobileHeader = () => {
  return (
    <header className='bg-background sticky inset-x-0 -top-12 z-50 gap-3 md:hidden'>
      <div className='flex h-12 items-center justify-between px-4 pt-2'>
        <Link href='/'>
          <div className='flex items-center justify-center gap-1.5'>
            <Image
              alt='buildex'
              className='animate-spin-y size-7 duration-[5s]'
              height={28}
              src='/logo.png'
              width={28}
              priority
            />
            <Image
              alt='buildex'
              className='h-5.5 w-auto'
              height={24}
              src='/logo-text.png'
              width={93}
              priority
            />
          </div>
        </Link>
        <div className='flex items-center gap-3'>
          <ChatDialog asChild>
            <Button size='iconSm' variant='muted'>
              <MessageSquareTextIcon className='size-4' />
            </Button>
          </ChatDialog>
          <Button asChild size='iconSm' variant='muted'>
            <Link href='tel:+998712099944' className='p-1.5'>
              <PhoneCallIcon className='size-4' />
            </Link>
          </Button>
          <LocaleSwitcher />
        </div>
      </div>
      <div className='bg-background px-4 py-2'>
        <MobileSearch>
          <Button
            className='bg-background text-muted-foreground w-full justify-start'
            variant='outline'
          >
            <SearchIcon />
            Саморез, доставка
          </Button>
        </MobileSearch>
      </div>
    </header>
  );
};
