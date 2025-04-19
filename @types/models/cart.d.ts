interface CartList {
  cart_items: Product[];
  id: number;
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
