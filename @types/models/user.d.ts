interface User {
  email: string;
  full_name: string;
  id: number;
  phone_number: string;
  /** `prorab` = PRO customer (given by the staff only), `user` = an ordinary customer */
  role?: 'prorab' | 'user';
}

type UserResponse = ApiResponse<User>;

interface UserPatchRequest {
  email?: string;
  full_name?: string;
  password?: string;
  phone_number?: string;
}
