interface Product {
  categories: Category[];
  description: string | null;
  discount: number | null;
  discount_price: number | null;
  id: number;
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

type ProductsResponse = ApiResponse<Pagination<Product>>;
type ProductResponse = ApiResponse<Product>;
