interface ProductCommentImage {
  id: number;
  image: string;
}

interface ProductComment {
  comment: string;
  created_at: string;
  customer: User;
  id: number;
  images: ProductCommentImage[];
  product_rating: number;
  reply_count: number;
}

interface ProductCommentRequest {
  comment: string;
  images: string[];
  product_rating: number;
}

type ProductCommentsResponse = ApiResponse<Pagination<ProductComment>>;
type ProductCommentResponse = ApiResponse<ProductComment>;

interface ProductCommentReply {
  created_at: string;
  customer: User;
  id: number;
  is_admin: boolean;
  reply_comment: string;
}

interface ProductCommentReplyRequest {
  reply_comment: string;
}

type ProductCommentRepliesResponse = ApiResponse<Pagination<ProductCommentReply>>;
type ProductCommentReplyResponse = ApiResponse<ProductCommentReply>;
