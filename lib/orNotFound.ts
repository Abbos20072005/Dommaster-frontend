import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';

/**
 * The API answers 4xx for a product, category or brand that does not exist. The page must be a
 * real 404 (not a 500, not a 200 with an empty page). A 5xx of the API stays an error.
 */
export const orNotFound = async <T>(request: Promise<T>): Promise<T> => {
  try {
    return await request;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status < 500) notFound();
    throw error;
  }
};
