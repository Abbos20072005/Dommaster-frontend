'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface Props {
  images: { id: number | string; src: string }[];
  /** index of the opened image; null — closed */
  index: number | null;
  alt: string;
  onClose: () => void;
}

/** Full-screen image viewer with swipe / arrows — the one the product page gallery opens. */
export const ImageLightbox = ({ images, index, alt, onClose }: Props) => (
  <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
    <DialogContent
      hideCloseButton
      overlayClassName='bg-[rgba(0,0,0,0.75)] backdrop-blur-[2px]'
      className='top-0 left-0 flex h-dvh max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-0 bg-transparent p-4 shadow-none sm:max-w-none sm:rounded-none'
      aria-describedby={undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <DialogTitle className='sr-only'>{alt}</DialogTitle>
      <DialogClose className='absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition-colors hover:bg-white'>
        <XIcon className='size-5' />
        <span className='sr-only'>Close</span>
      </DialogClose>
      <Carousel className='w-full max-w-3xl' opts={{ startIndex: index ?? 0 }}>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className='relative h-[85vh] w-full'>
                <Image fill alt={alt} className='object-contain' src={image.src} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className='left-2' />
            <CarouselNext className='right-2' />
          </>
        )}
      </Carousel>
    </DialogContent>
  </Dialog>
);
