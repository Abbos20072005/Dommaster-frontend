interface CartItem {
  id: number;
  is_checked: boolean;
  product: Product;
  quantity: number;
}

type CartItemResponse = ApiResponse<CartItem>;

interface CartList {
  cart_items: CartItem[];
  id: number;
  products_total_price: number;
  saved_price: number;
  total_price: number;
}

type CartListResponse = ApiResponse<CartList>;

interface CartItemRequest {
  is_checked?: boolean;
  product: number;
  quantity?: number;
}

interface CartBulkRequest {
  is_checked?: boolean;
}
