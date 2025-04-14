interface Brand {
  id: number;
  image: string;
  name: string;
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
