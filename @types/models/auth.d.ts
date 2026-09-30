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
  phone_number: string;
}

type ForgotPasswordResponse = ApiResponse<{
  otp_key: string;
}>;

interface ResetPasswordVerifyRequest {
  otp_code: number;
  otp_key: string;
}

type ResetPasswordVerifyResponse = ApiResponse<{
  reset_token: string;
}>;

interface ResetPasswordRequest {
  confirm_new_password: string;
  new_password: string;
  reset_token: string;
}
interface SendOtpRequest {
  phone_number: string;
}

type SendOtpResponse = ApiResponse<{
  is_new: boolean;
  otp_key: string;
  telegram_linked: boolean;
}>;
type UserRole = 'prorab' | 'user';

interface SendOtpRequest {
  phone_number: string;
  role?: UserRole;
}

type SendOtpResponse = ApiResponse<{
  is_new: boolean;
  otp_key: string;
  telegram_linked: boolean;
}>;

interface TelegramOtpRequest {
  otp_key: string;
}

type TelegramOtpResponse = ApiResponse<{
  deep_link: string | null;
  expires_in: number | null;
  link_token: string | null;
  linked: boolean;
  otp_key: string;
}>;