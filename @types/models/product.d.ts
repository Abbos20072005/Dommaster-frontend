interface Product {
  categories: Category[];
  cover_image: string;
  discount_price: number | null;
  id: number;
  images: string[];
  isInFavorites: boolean;
  price: number;
  product_count: number;
  rating: number | null;
  reviews: Review[];
  reviews_count: number;
  title: string;
  breadcrumbs: {
    id: number;
    title: string;
    url: string;
  }[];
  description: {
    description: string;
    properties: {
      key: string;
      value: string;
      values: string[];
    }[];
  } | null;
  extended_description: {
    description: string;
    properties: {
      key: string;
      value: string;
      values: string[];
    }[];
  } | null;
  properties: {
    title: string;
    value: {
      title: string;
      link: string | null;
    }[];
  }[];
}

type ProductsResponse = ApiResponse<Pagination<Product>>;
type ProductResponse = ApiResponse<Product>;
