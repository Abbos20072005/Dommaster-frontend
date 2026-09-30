import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useTimer } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { postResendCode, postTelegramOtp, postVerify } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';

import type { VerifyFormSchema } from '../constants';

import { verifyFormSchema } from '../constants';

interface Props {
  otpKey: string;
  onSuccess?: (data: VerifyResponse) => void;
  setOtpKey: (otpKey: string) => void;
}

export const useVerifyForm = ({ otpKey, setOtpKey, onSuccess }: Props) => {
  const t = useTranslations();
  const form = useForm<VerifyFormSchema>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      otp_code: ''
    }
  });
  const [showResetButton, setShowResetButton] = React.useState(false);
  const [telegramLink, setTelegramLink] = React.useState<null | string>(null);
  const {
    start,
    reset,
    minutesLeft: minutesLeftToNewReset,
    secondsLeft: secondsLeftToNewReset
  } = useTimer({
    autoStart: true,
    initialTime: 5,
    onTimerEnd: () => setShowResetButton(true)
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const postVerifyMutation = useMutation({
    mutationFn: postVerify,
    onSuccess: ({ data }) => {
      Cookies.set(COOKIES.ACCESS_TOKEN, data.result.access_token);
      Cookies.set(COOKIES.REFRESH_TOKEN, data.result.refresh_token);
      onSuccess?.(data);
      queryClient.invalidateQueries();
      router.refresh();
    }
  });

  const restartTimer = () => {
    reset();
    start();
    setShowResetButton(false);
  };

  const postResendCodeMutation = useMutation({
    mutationFn: postResendCode,
    onSuccess: ({ data }) => {
      setOtpKey(data.result.otp_key);
      restartTimer();
    }
  });

  const postTelegramOtpMutation = useMutation({
    mutationFn: postTelegramOtp,
    onSuccess: ({ data }) => {
      const { otp_key, linked, deep_link } = data.result;
      setOtpKey(otp_key);
      restartTimer();

      if (linked) {
        setTelegramLink(null);
        toast.success(t('Code sent to Telegram'));
        return;
      }

      if (deep_link) {
        setTelegramLink(deep_link);
        window.open(deep_link, '_blank', 'noopener,noreferrer');
      }
    }
  });

  const onSubmit = (data: VerifyFormSchema) => {
    postVerifyMutation.mutate({
      data: {
        otp_code: +data.otp_code,
        otp_key: otpKey
      }
    });
  };

  const onResendCode = () => {
    postResendCodeMutation.mutate({ data: { otp_key: otpKey } });
  };

  const onTelegramCode = () => {
    postTelegramOtpMutation.mutate({ data: { otp_key: otpKey } });
  };

  return {
    form,
    state: {
      isPending: postVerifyMutation.isPending,
      isResendPending: postResendCodeMutation.isPending,
      isTelegramPending: postTelegramOtpMutation.isPending,
      minutesLeftToNewReset,
      secondsLeftToNewReset,
      showResetButton,
      telegramLink
    },
    functions: {
      onSubmit,
      onResendCode,
      onTelegramCode
    }
  };
};
