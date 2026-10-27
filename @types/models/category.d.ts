interface Category {
  icon: string;
  id: number;
  image: string;
  name: string;
  /** the readable address part of the category (the language of the request) */
  slug?: string;
  sub_categories: SubCategory[];
}

type CategoriesResponse = ApiResponse<Omit<Category, 'sub_categories'>[]>;
type CategoryResponse = ApiResponse<Category>;

interface SubCategory {
  id: number;
  image: string;
  name: string;
  slug?: string;
  product_item_categories: ItemCategory[];
  breadcrumbs: {
    id: number;
    name: string;
    slug?: string;
  }[];
}

type SubCategoryResponse = ApiResponse<SubCategory>;

interface ItemCategory {
  id: number;
  image: string;
  name: string;
  slug?: string;
  product_amount: number;
  breadcrumbs: {
    id: number;
    name: string;
    slug?: string;
    url: string | null;
  }[];
}

type ItemCategoryResponse = ApiResponse<ItemCategory>;
