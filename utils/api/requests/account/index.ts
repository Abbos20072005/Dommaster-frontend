import { api, publicApi } from '@/utils/api/instance';

/** `is_deleted: true` means the "Delete account" button must be shown. */
export const getDeleteButton = () =>
  publicApi.get<ApiResponse<{ is_deleted: boolean }>>('/base/delete-button/');

/** The customer comes from the token; success is the 204 status, the body is not read. */
export const deleteAccount = () => api.delete('/auth/delete/account/');
