'use client';

import dynamic from 'next/dynamic';
import { Slot } from 'radix-ui';
import React from 'react';

// the window (the message list, the photo upload, the form) is a separate chunk: it is loaded when
// the customer reaches for the button, so the first load of a page does not carry it (BLD-485)
const loadContent = () => import('./ChatDialogContent').then((module) => module.ChatDialogContent);
const ChatDialogContent = dynamic(loadContent, { ssr: false });

interface Props extends React.ComponentProps<'button'> {
  /** the button is the child itself, not a new element around it */
  asChild?: boolean;
}

/** The chat button; the window opens on a click. */
export const ChatDialog = ({ asChild, children, onClick, onFocus, onPointerEnter, ...props }: Props) => {
  const [open, setOpen] = React.useState(false);
  // once opened the window stays mounted: closing it keeps the typed message and the list
  const [mounted, setMounted] = React.useState(false);
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <>
      <Comp
        aria-haspopup='dialog'
        type={asChild ? undefined : 'button'}
        {...props}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          setMounted(true);
          setOpen(true);
        }}
        // the window starts loading when a finger or a cursor comes near the button
        onFocus={(event: React.FocusEvent<HTMLButtonElement>) => {
          void loadContent();
          onFocus?.(event);
        }}
        onPointerEnter={(event: React.PointerEvent<HTMLButtonElement>) => {
          void loadContent();
          onPointerEnter?.(event);
        }}
      >
        {children}
      </Comp>
      {mounted && <ChatDialogContent open={open} onOpenChange={setOpen} />}
    </>
  );
};
