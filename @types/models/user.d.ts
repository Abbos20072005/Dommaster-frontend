interface User {
  email: string;
  full_name: string;
  id: number;
  phone_number: string;
}

type UserResponse = ApiResponse<User>;

interface UserPatchRequest {
  email?: string;
  full_name?: string;
  password?: string;
  phone_number?: string;
}
