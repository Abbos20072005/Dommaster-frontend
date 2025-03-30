interface Product {
  categories: Category[];
  cover_image: string;
  id: number;
  images: string[];
  product_count: number;
  rating: number | null;
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
  price: {
    type: string;
    gold: number;
    retail: number;
  };
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
