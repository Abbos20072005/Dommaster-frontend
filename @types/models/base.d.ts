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

interface News {
  created_at: string;
  description: string;
  id: number;
  image: string;
  title: string;
}

type NewsListResponse = ApiResponse<Pagination<News>>;
type NewsResponse = ApiResponse<News>;

interface Article {
  created_at: string;
  description: string;
  id: number;
  short_description: string;
  title: string;
}

type ArticlesResponse = ApiResponse<Pagination<Article>>;
type ArticleResponse = ApiResponse<Article>;

interface Review {
  created_at: string;
  description: string;
  id: number;
  short_description: string;
  title: string;
}

type ReviewsResponse = ApiResponse<Pagination<Review>>;
type ReviewResponse = ApiResponse<Review>;

interface Video {
  created_at: string;
  description: string;
  id: number;
  name: string;
  url: string;
}

type VideosResponse = ApiResponse<Video[]>;
type VideoResponse = ApiResponse<Video>;
