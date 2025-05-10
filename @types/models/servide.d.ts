interface Service {
  description: string;
  icon: string;
  id: number;
  name: string;
}

type ServicesResponse = ApiResponse<Omit<Service, 'description'>[]>;
type ServiceResponse = ApiResponse<Service>;
