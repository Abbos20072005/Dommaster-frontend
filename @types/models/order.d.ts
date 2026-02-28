const enum OrderStatus {
  Pending = 0,
  Collecting = 1,
  Delivering = 2,
  Delivered = 3,
  Canceled = 4
}

interface OrderPreview {
  created_at: string;
  customer: User;
  id: number;
  order_location: Address;
  status: OrderStatus;
  total_price: number;
  order_items: {
    id: number;
    image: string;
  }[];
}

interface Order extends Omit<OrderPreview, 'order_items'> {
  promocode: Promo | null;
  order_items: {
    id: number;
    quantity: number;
    product: Product;
  }[];
}

enum PaymentMethod {
  Click = 1,
  Payme = 2,
  Uzum = 3,
  Cash = 4
}

interface OrderRequest {
  is_web: boolean;
  payment_type: PaymentMethod;
  promocode?: string;
}

interface OrderPayRequest {
  is_web: boolean;
  order_id: number;
  payment_type: PaymentMethod;
}

type OrdersResponse = ApiResponse<Pagination<OrderPreview>>;
type OrderResponse = ApiResponse<Order>;
