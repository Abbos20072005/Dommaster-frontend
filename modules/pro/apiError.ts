import { AxiosError } from 'axios';

/** `error_code` of the answer of the API (the PRO errors are 34-39) and the HTTP status. */
export const getApiError = (error: unknown) => {
  if (!(error instanceof AxiosError)) return { code: undefined, status: undefined, data: undefined };
  return {
    code: error.response?.data?.error_code as number | undefined,
    status: error.response?.status,
    data: error.response?.data as { detail?: { conflicting_item_ids?: number[] } } | undefined
  };
};
