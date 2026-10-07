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
  brand?: {
    id: number;
    name: string;
    image: string;
  } | null;
  variant_groups?: {
    id: number;
    name: string;
    display_type: 'text' | 'image';
    items: {
      id: number;
      product_id: number;
      display_value: string;
      image: string | null;
      is_current: boolean;
    }[];
  }[];
}

interface ProductRequest {
  brand?: number;
  category?: number;
  item_category?: number;
  sub_category?: number;
  page?: number;
  page_size?: number;
  price_from?: number;
  price_to?: number;
  q?: string;
  sale_id?: number;
  sort_by?: string;
  /** attribute filters: `{ key: ['value'] }` for checkbox, `{ key_from: 1, key_to: 5 }` for range */
  filters?: Record<string, string[] | number>;
}

/** Item category attribute filter (BLD-104): size, material, packaging etc. */
interface AttributeFilter {
  key: string;
  label: string;
  type: 'checkbox' | 'range' | (string & {});
  unit?: string;
  min?: number;
  max?: number;
  values?: { value: string; count: number }[];
}

type AttributeFiltersResponse = ApiResponse<AttributeFilter[]>;

type ProductsResponse = ApiResponse<Pagination<Product> & { totalElements: number }>;
type ProductResponse = ApiResponse<Product>;
