import { getImageProps } from 'next/image';
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

  // one <picture>: the browser takes the phone or the wide picture and loads only that one (two
  // <Image>s with `priority` made it fetch both)
  // `priority` alone no longer sets the fetch priority in `getImageProps`: it is set here
  const loadingProps = priority ? { fetchPriority: 'high' as const, loading: 'eager' as const } : {};
  const mobile = getImageProps({
    alt,
    ...loadingProps,
    height: 230,
    sizes: '100vw',
    src: banner.mobile_image || banner.desktop_image,
    width: 690
  });
  const desktop = getImageProps({
    alt,
    ...loadingProps,
    height: 413,
    sizes: '(min-width: 1280px) 1240px, 100vw',
    src: banner.desktop_image,
    width: 1240
  });

  const pictures = (
    <picture className='contents'>
      <source media='(min-width: 768px)' sizes={desktop.props.sizes} srcSet={desktop.props.srcSet} />
      <img {...mobile.props} alt={alt} className='size-full rounded-lg object-cover md:rounded-xl' />
    </picture>
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
