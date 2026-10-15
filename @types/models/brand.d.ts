interface Brand {
  id: number;
  image: string;
  name: string;
  /** a short text about the brand (written by the content manager); not in the API yet */
  description?: string | null;
}

type BrandsResponse = ApiResponse<Brand[]>;
type BrandResponse = ApiResponse<Brand>;

interface AddsBrand {
  id: number;
  image: string;
  name: string;
  products: Product[];
}

type AddsBrandsResponse = ApiResponse<AddsBrand[]>;
