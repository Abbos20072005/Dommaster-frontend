type SearchResponse = ApiResponse<{
  products: string[];
  brands: {
    id: number;
    name: string;
    image: string;
  }[];
  categories: {
    id: number;
    name: string;
    image: string;
  }[];
}>;
