interface Product {
  categories: Category[];
  description: string | null;
  discount: number | null;
  discount_price: number | null;
  id: number;
  in_cart: boolean;
  in_cart_quantity: number;
  is_checked: boolean;
  is_favourite: boolean;
  name: string;
  price: number;
  quantity: number;
  questions: Question[];
  rating: number | null;
  reviews: Review[];
  reviews_count: number;
  breadcrumbs: {
    id: number;
    title: string;
    url: string;
  }[];
  images: {
    id: number;
    product: number;
    image: string;
  }[];
  properties: {
    title: string;
    value: string;
    unit: string;
  }[];
}

interface ProductRequest {
  brand?: number;
  category?: number;
  page: number;
  page_size: number;
  price_from: number;
  price_to: number;
  q?: string;
  sort_by?: string;
}

type ProductsResponse = ApiResponse<Pagination<Product> & { totalElements: number }>;
type ProductResponse = ApiResponse<Product>;
