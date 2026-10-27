const enum OrderStatus {
  Pending = 0,
  Collecting = 1,
  Delivering = 2,
  /** pickup: Collecting -> ReadyForPickup -> Delivered (the customer took the order) */
  Delivered = 3,
  Canceled = 4,
  ReadyForPickup = 5
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
  /** pickup: the shop as it was when the order was placed (null for a delivery) */
  pickup_store?: PickupStore | null;
  /** pickup: the same shop as it is now, in the old branches shape (older orders have only this) */
  pickup_branch?: Partial<Branch> | null;
  /** the time the order became ready for pickup, and the time it must be picked up by (+2 days) */
  ready_for_pickup_at?: string | null;
  pickup_deadline?: string | null;
  /** true: the order is ready and the deadline has passed */
  pickup_expired?: boolean;
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

interface PickupStore {
  id: number;
  name: string;
  address: string;
  landmark: string;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface OrderRequest {
  address_id?: number;
  /** the shop of the pickup: its id (the same ids as in the stores list), with delivery_type 1 */
  branch_id?: number;
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
