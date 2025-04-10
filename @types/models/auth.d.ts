interface LoginRequest {
  email?: string;
  password: string;
  phone_number?: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
}

type RegisterResponse = ApiResponse<{
  otp_key: string;
}>;

interface VerifyRequest {
  otp_code: number;
  otp_key: string;
}

type VerifyResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
}>;

interface ResendRequest {
  otp_key: string;
}

type ResendResponse = ApiResponse<{
  otp_key: string;
}>;

interface ForgotPasswordRequest {
  password: string;
  phone_number: string;
}

type ForgotPasswordResponse = number;
