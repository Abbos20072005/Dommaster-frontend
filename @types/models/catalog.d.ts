interface Catalog {
  children: Catalog[];
  id: number;
  image?: string;
  productQty: number;
  title: string;
  breadcrumbs?: {
    id: number;
    title: string;
    url: string;
  }[];
}

type CatalogsResponse = ApiResponse<Catalog[]>;
type CatalogResponse = ApiResponse<Catalog>;
