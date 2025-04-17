interface Category {
  icon: string;
  id: number;
  image: string;
  name: string;
  productQty: number;
  sub_categories: SubCategory[];
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

interface SubCategory {
  id: number;
  image: string;
  name: string;
  product_item_categories: ItemCategory[];
  productQty: number;
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

interface ItemCategory {
  id: number;
  image: string;
  name: string;
  productQty: number;
  breadcrumbs: {
    id: number;
    title: string;
    url: string | null;
  }[];
}

type CategoriesResponse = ApiResponse<Category[]>;
type CategoryResponse = ApiResponse<Category>;
