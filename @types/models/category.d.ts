interface Category {
  icon: string;
  id: number;
  image: string;
  name: string;
  sub_categories: SubCategory[];
  breadcrumbs: {
    id: number;
    name: string;
  }[];
}

type CategoriesResponse = ApiResponse<Category[]>;
type CategoryResponse = ApiResponse<Category>;

interface SubCategory {
  id: number;
  image: string;
  name: string;
  product_item_categories: ItemCategory[];
  breadcrumbs: {
    id: number;
    name: string;
  }[];
}

type SubCategoryResponse = ApiResponse<SubCategory>;

interface ItemCategory {
  id: number;
  image: string;
  name: string;
  product_quantity: number;
  breadcrumbs: {
    id: number;
    name: string;
    url: string | null;
  }[];
}

type ItemCategoryResponse = ApiResponse<ItemCategory>;
