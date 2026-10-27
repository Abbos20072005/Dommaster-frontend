/** A shop where an order can be picked up (`GET /base/stores/`, BLD-313): active ones, in order. */
interface StoreScheduleDay {
  /** 0 = Monday ... 6 = Sunday */
  day: number;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
}

interface Store {
  id: number;
  name: string;
  address: string;
  /** the landmark ("near the bank") */
  landmark: string;
  phone: string;
  photo: string | null;
  latitude: number;
  longitude: number;
  schedule: StoreScheduleDay[];
  /** counted by the server in the Tashkent time */
  is_open_now: boolean;
  closes_at: string | null;
  next_open: string | null;
  sort_order: number;
}

type StoresResponse = ApiResponse<Store[]>;
