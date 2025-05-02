interface Sale {
  discount_from: string;
  discount_to: string;
  id: number;
  image: string;
  name: string;
  products: Product[];
}

interface SaleMain extends Omit<Sale, 'image'> {
  bg_image: string;
}

type SalesResponse = ApiResponse<Omit<Sale[], 'products'>>;
type SaleMainResponse = ApiResponse<SaleMain>;
type SaleResponse = ApiResponse<Sale>;
