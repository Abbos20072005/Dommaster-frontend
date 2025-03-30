interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone_number: string;
}

type UserResponse = ApiResponse<User>;

interface UserPatchRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}
