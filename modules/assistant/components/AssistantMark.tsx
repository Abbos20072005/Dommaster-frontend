import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  /** the colour of the sparkle (the bubble takes `currentColor`) */
  sparkle?: string;
}

/** The sign of the assistant: a chat bubble with a sparkle. No robot, no other AI logos. */
export const AssistantMark = ({ className, sparkle = '#fff' }: Props) => (
  <svg
    aria-hidden
    className={cn('shrink-0', className)}
    fill='none'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5 2.5h14A3.5 3.5 0 0 1 22.5 6v8.5a3.5 3.5 0 0 1-3.5 3.5h-7.1L7.2 21.6a.6.6 0 0 1-1-.46V18H5a3.5 3.5 0 0 1-3.5-3.5V6A3.5 3.5 0 0 1 5 2.5Z'
      fill='currentColor'
    />
    <path
      d='m12 5.9 1.15 3.05L16.2 10.1l-3.05 1.15L12 14.3l-1.15-3.05L7.8 10.1l3.05-1.15L12 5.9Z'
      fill={sparkle}
    />
  </svg>
);
