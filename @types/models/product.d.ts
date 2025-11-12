type ProductUnit = 'g' | 'kg' | 'l' | 'm' | 'pcs' | 'sm';

interface Product {
  categories: Category[];
  comments_quantity: number;
  description: string | null;
  discount: number | null;
  discount_price: number | null;
  id: number;
  in_cart: boolean;
  in_cart_quantity: number;
  is_checked: boolean;
  is_commented: boolean;
  is_favourite: boolean;
  name: string;
  price: number;
  quantity: number;
  questions_quantity: number;
  rating: number | null;
  unit: ProductUnit;
  breadcrumbs: {
    id: number;
    name: string;
  }[];
  characteristics: {
    name: string;
    value: string;
    unit: string;
  }[];
  comment_ratings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  } | null;
  images: {
    id: number;
    product: number;
    image: string;
  }[];
}

interface ProductRequest {
  brand?: number;
  item_category?: number;
  page?: number;
  page_size?: number;
  price_from?: number;
  price_to?: number;
  q?: string;
  sale_id?: number;
  sort_by?: string;
}

type ProductsResponse = ApiResponse<Pagination<Product> & { totalElements: number }>;
type ProductResponse = ApiResponse<Product>;
