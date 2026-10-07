import { FacebookIcon, InstagramIcon, SendIcon, YoutubeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS } from '@/utils/constants';

const SOCIALS = [
  { name: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { name: 'Telegram', href: SOCIAL_LINKS.telegram, Icon: SendIcon },
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { name: 'YouTube', href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon }
];

export const Socials = () => {
  // Akkaunti tasdiqlanmagan tarmoq ko'rsatilmaydi (href="#" qolmasin)
  const socials = SOCIALS.filter((social) => social.href);

  if (!socials.length) return null;

  return (
    <div className='mt-4 flex gap-3 md:mt-6'>
      {socials.map(({ name, href, Icon }) => (
        <Button key={name} asChild size='icon' variant='outline'>
          <a aria-label={name} href={href} rel='noreferrer' target='_blank'>
            <Icon className='size-6' />
          </a>
        </Button>
      ))}
    </div>
  );
};
