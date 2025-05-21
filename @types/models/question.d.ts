interface ProductQuestion {
  created_at: string;
  customer: User;
  id: number;
  question: string;
  reply_count: number;
  replies: {
    question: string;
    created_at: string;
    customer: User;
    id: number;
  }[];
}

interface ProductQuestionRequest {
  question: string;
}

type ProductQuestionsResponse = ApiResponse<Pagination<ProductQuestion>>;
type ProductQuestionResponse = ApiResponse<ProductQuestion>;

interface ProductQuestionReply {
  answer: string;
  created_at: string;
  customer: User;
  id: number;
  is_admin: boolean;
}

interface ProductQuestionReplyRequest {
  answer: string;
}

type ProductQuestionRepliesResponse = ApiResponse<Pagination<ProductQuestionReply>>;
type ProductQuestionReplyResponse = ApiResponse<ProductQuestionReply>;
