const enum DeliveryType {
  Delivery = 0,
  Pickup = 1
}

interface DeliveryRoutePoint {
  id: number | string;
  fullname: string;
  coordinates: [number, number];
}

interface DeliveryCheckPriceItem {
  product_id?: number;
  quantity: number;
  weight?: number;
  size?: {
    length: number;
    width: number;
    height: number;
  };
}

interface DeliveryCheckPriceRequest {
  items: DeliveryCheckPriceItem[];
  route_points: DeliveryRoutePoint[];
  skip_door_to_door?: boolean;
}

interface DeliveryCheckPriceResult {
  price: string;
  currency_rules: {
    code: string;
    text: string;
    template: string;
    sign: string;
  };
  distance_meters: number;
  eta: number;
  zone_id: string;
  requirements: null | unknown;
}

type DeliveryCheckPriceResponse = ApiResponse<DeliveryCheckPriceResult>;
