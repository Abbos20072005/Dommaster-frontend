const enum OrderStatus {
  Pending = 0,
  Collecting = 1,
  Delivering = 2,
  Delivered = 3,
  Canceled = 4
}

/** copied from the address when the order is created: later changes of the address do not touch it */
interface OrderAddressDetails {
  apartment?: string;
  courier_comment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
}

interface OrderPreview extends OrderAddressDetails {
  created_at: string;
  customer: User;
  id: number;
  order_location: Address;
  status: OrderStatus;
  total_price: number;
  payment_type: number;
  payment_method?: string;
  delivery_type: number;
  order_items: {
    id: number;
    image: string;
  }[];
}

interface Order extends Omit<OrderPreview, 'order_items'> {
  /** pickup: the shop as it was when the order was placed (BLD-313) */
  store?: Partial<Store> | null;
  store_id?: number | null;
  promocode: Promo | null;
  ofd_url: string | null;
  delivery_price: string | number | null;
  order_items: {
    id: number;
    quantity: number;
    product: Product;
    /** the PRO project the item is linked to (`null`: not linked or the customer is not PRO) */
    project?: { id: number; name: string } | null;
  }[];
}

enum PaymentMethod {
  Click = 1,
  Payme = 2,
  Uzum = 3,
  Cash = 4
}

interface OrderRequest {
  address_id?: number;
  /** the shop of the pickup (delivery_type = pickup) */
  store_id?: number;
  /** where the order was placed: analytics ("Channels") relies on it */
  channel?: 'site' | 'ios' | 'android';
  delivery_price?: string;
  delivery_type: DeliveryType;
  is_web: boolean;
  payment_method?: 'cash' | 'card';
  payment_type: PaymentMethod;
  promocode?: string;
  receiver_name?: string;
  receiver_phone?: string;
}

interface OrderPayRequest {
  is_web: boolean;
  order_id: number;
  payment_type: PaymentMethod;
  payment_method?: 'cash' | 'card';
}

type OrdersResponse = ApiResponse<Pagination<OrderPreview>>;
type OrderResponse = ApiResponse<Order>;
