interface Branch {
  address: string | null;
  branch_type: {
    id: number;
    name: string;
  };
  description: string | null;
  id: number;
  image: string | null;
  latitude: number;
  location_name: string;
  longitude: number;
  name: string;
  phone_number: string;
  position: number;
  working_hours: string;
}

type BranchesResponse = ApiResponse<Pagination<Branch>>;
