interface Category {
  children: Category[];
  id: number;
  image?: string;
  productQty: number;
  title: string;
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

type CatalogsResponse = ApiResponse<Category[]>;
type CatalogResponse = ApiResponse<Category>;
