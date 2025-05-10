enum OrderStatus {
  Pending = 0,
  Collecting = 1,
  Delivering = 2,
  Delivered = 3,
  Canceled = 4
}

interface Order {
  created_at: string;
  customer: User;
  id: number;
  status: OrderStatus;
  total_price: number;
  updated_at: string;
}

interface OrderRequest {
  promocode?: string;
}

type OrdersResponse = ApiResponse<Pagination<Order>>;
type OrderResponse = ApiResponse<Order>;
