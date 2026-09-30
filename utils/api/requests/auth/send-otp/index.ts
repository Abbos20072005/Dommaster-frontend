import { publicApi } from '@/utils/api/instance';

/**
 * Login / Register by phone.
 * Sends an SMS code; if the user is new, the backend creates the account.
 * Then verify the code via `auth/otp/verify/` to get the tokens.
 */
export const postSendOtp = ({ config, data }: RequestConfig<SendOtpRequest>) =>
  publicApi.post<SendOtpResponse>('auth/auth/phone/', data, config);
