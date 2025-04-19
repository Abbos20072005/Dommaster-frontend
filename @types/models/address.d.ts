interface Address {
  id: number;
  is_default: boolean;
  latitude: number;
  location_name: string;
  longitude: number;
  name: string;
}

interface AddressRequest {
  is_default?: boolean;
  latitude?: number;
  location_name?: string;
  longitude?: number;
  name?: string;
}

type AddressesResponse = ApiResponse<Address[]>;
type AddressResponse = ApiResponse<Address>;
