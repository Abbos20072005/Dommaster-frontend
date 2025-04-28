interface Order {
  created_at: string;
  id: number;
  status: string;
  updated_at: string;
}

interface OrderRequest {
  promocode: string;
}

type OrdersResponse = ApiResponse<Pagination<Order>>;
type OrderResponse = ApiResponse<Order>;
