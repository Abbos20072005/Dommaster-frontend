import Image from 'next/image';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { getBannerLink } from '@/lib/banner';
import { cn } from '@/lib/utils';

interface Props {
  banner: Banner;
  className?: string;
  priority?: boolean;
}

/**
 * One banner: a square picture on a phone (the wide one when there is none), a wide one on a
 * larger screen; a click leads where the banner says (see `getBannerLink`).
 */
export const BannerView = ({ banner, className, priority }: Props) => {
  const link = getBannerLink(banner);
  const alt = banner.title || 'Buildex';
  const boxClassName = cn('block aspect-[3/1] md:aspect-[6/1]', className);

  const pictures = (
    <>
      <Image
        alt={alt}
        className='size-full rounded-lg object-cover md:hidden md:rounded-xl'
        height={230}
        priority={priority}
        src={banner.mobile_image || banner.desktop_image}
        width={690}
      />
      <Image
        alt={alt}
        className='hidden size-full rounded-lg object-cover md:block md:rounded-xl'
        height={413}
        priority={priority}
        src={banner.desktop_image}
        width={1240}
      />
    </>
  );

  if (!link) return <div className={boxClassName}>{pictures}</div>;

  if (link.external)
    return (
      <a className={boxClassName} href={link.href} rel='noreferrer noopener' target='_blank'>
        {pictures}
      </a>
    );

  return (
    <Link className={boxClassName} href={link.href}>
      {pictures}
    </Link>
  );
};
