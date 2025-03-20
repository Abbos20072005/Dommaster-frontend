interface LoginRequest {
  email?: string;
  password: string;
  phone_number?: string;
}

type LoginResponse = BaseResponse<{
  access_token: string;
  refresh_token: string;
}>;

interface RegisterRequest {
  password: string;
  phone_number: string;
}

type RegisterResponse = BaseResponse<{
  access_token: string;
  refresh_token: string;
}>;
