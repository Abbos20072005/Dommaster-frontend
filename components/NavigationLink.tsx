'use client';

import React from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<typeof Link> {
  activeClassName?: string;
}

export const NavigationLink = ({ href, activeClassName = '', className, ...props }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return <Link href={href} className={cn(className, isActive && activeClassName)} {...props} />;
};
