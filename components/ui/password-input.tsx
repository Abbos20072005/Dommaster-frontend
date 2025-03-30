import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { Button } from './button';

type Props = Omit<React.ComponentProps<typeof Input>, 'type'>;

const PasswordInput = ({ className, disabled, ...props }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className={cn('relative rounded-md', className)}>
      <Input disabled={disabled} type={showPassword ? 'text' : 'password'} {...props} />
      <Button
        className='text-muted-foreground absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 rounded-md'
        disabled={disabled}
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
      </Button>
    </div>
  );
};

export { PasswordInput };
