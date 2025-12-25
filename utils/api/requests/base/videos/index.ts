import { publicApi } from '@/utils/api/instance';

export const getVideos = (requestConfig?: RequestConfig) =>
  publicApi.get<VideosResponse>('/base/video/', requestConfig?.config);

export const getVideoById = ({ id, config }: RequestConfig & { id: number | string }) =>
  publicApi.get<VideoResponse>(`/base/video/${id}/`, config);
