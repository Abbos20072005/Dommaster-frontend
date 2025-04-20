interface ProductCommentImage {
  id: number;
  image: string;
}

interface ProductComment {
  comment: string;
  created_at: string;
  customer: User;
  id: number;
  product_rating: number;
  replies: {
    comment: string;
    created_at: string;
    customer: User;
    id: number;
  }[];
}

interface ProductCommentRequest {
  comment: string;
  product_rating: number;
}

type ProductCommentsResponse = ApiResponse<Pagination<ProductComment>>;
type ProductCommentResponse = ApiResponse<ProductComment>;
