interface Banner {
  id: number;
  image: string;
  link: string;
  short_description: string | null;
  title: string;
}

type BannersResponse = ApiResponse<Banner[]>;

interface ChatMessage {
  chat: number;
  created_at: string;
  file: string;
  id: number;
  is_answer: boolean;
  message: string;
}

interface ChatMessageRequest {
  message: string;
}
type ChatMessagesResponse = ApiResponse<ChatMessage[]>;
type ChatMessageResponse = ApiResponse<ChatMessage>;
