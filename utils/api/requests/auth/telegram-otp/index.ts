import { publicApi } from '@/utils/api/instance';

/**
 * Sends the OTP code to the Telegram bot instead of SMS.
 * Returns a NEW otp_key that must be used for `auth/otp/verify/`.
 */
export const postTelegramOtp = ({ config, data }: RequestConfig<TelegramOtpRequest>) =>
  publicApi.post<TelegramOtpResponse>('auth/otp/telegram/', data, config);
