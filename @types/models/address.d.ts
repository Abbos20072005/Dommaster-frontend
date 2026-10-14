/** the delivery details of an address: empty values come as "" */
interface AddressDetails {
  apartment?: string;
  courier_comment?: string;
  entrance?: string;
  floor?: string;
  intercom?: string;
}

interface Address extends AddressDetails {
  id: number;
  is_default: boolean;
  latitude: number;
  location_name: string;
  longitude: number;
  name: string;
}

interface AddressRequest extends AddressDetails {
  /** `POST` does not accept it: a new default address is saved with `PATCH` afterwards */
  is_default?: boolean;
  latitude?: number;
  location_name?: string;
  longitude?: number;
  name?: string;
}

type AddressesResponse = ApiResponse<Address[]>;
type AddressResponse = ApiResponse<Address>;
