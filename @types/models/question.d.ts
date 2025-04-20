interface ProductQuestion {
  created_at: string;
  customer: User;
  id: number;
  question: string;
  replies: {
    comment: string;
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
