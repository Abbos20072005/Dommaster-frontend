import type { ClassValue } from 'clsx';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { AxiosError } from 'axios';
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3 $4 $5');

export const formatPrice = (price: number | string) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function handleFormServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (error instanceof AxiosError) {
    const serverErrors = error.response?.data?.error;

    if (serverErrors && typeof serverErrors === 'object') {
      // For each server error, set it to the corresponding field in the form.
      Object.entries(serverErrors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          setError(field as Path<T>, {
            type: 'server',
            message: messages[0] // Use the first error message
          });
        } else if (typeof messages === 'string') {
          setError(field as Path<T>, {
            type: 'server',
            message: messages
          });
        }
      });
    } else if (typeof serverErrors === 'string') {
      toast.error(serverErrors);
    }
  } else {
    toast.error('Occurred unexpected error, refresh the page and try again!');
  }
}
