import { api } from '@/utils/api/instance';

export const getChatMessages = (requestConfig?: RequestConfig) =>
  api.get<ChatMessagesResponse>('/base/chat/list/', requestConfig?.config);

export const postChatMessage = ({ data, config }: RequestConfig<ChatMessageRequest>) =>
  api.post<ChatMessageResponse>('/base/chat/create/', data, config);
