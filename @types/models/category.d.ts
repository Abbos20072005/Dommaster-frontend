interface Category {
  icon: string;
  id: number;
  image: string;
  productQty: number;
  sub_categories: SubCategory[];
  title: string;
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

interface SubCategory {
  id: number;
  image: string;
  product_item_categories: ItemCategory[];
  productQty: number;
  title: string;
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

interface ItemCategory {
  id: number;
  image: string;
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
