import { api } from '@/utils/api/instance';

export const getVideos = (requestConfig?: RequestConfig) =>
  api.get<VideosResponse>('/base/video/', requestConfig?.config);

export const getVideoById = ({ id, config }: RequestConfig & { id: number | string }) =>
  api.get<VideoResponse>(`/base/video/${id}/`, config);
