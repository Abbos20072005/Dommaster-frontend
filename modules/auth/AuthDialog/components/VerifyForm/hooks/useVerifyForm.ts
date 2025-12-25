import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useTimer } from '@/hooks';
import { useRouter } from '@/i18n/navigation';
import { postResendCode, postVerify } from '@/utils/api/requests';
import { COOKIES } from '@/utils/constants';

import type { VerifyFormSchema } from '../constants';

import { verifyFormSchema } from '../constants';

interface Props {
  otpKey: string;
  onSuccess?: (data: VerifyResponse) => void;
  setOtpKey: (otpKey: string) => void;
}

export const useVerifyForm = ({ otpKey, setOtpKey, onSuccess }: Props) => {
  const form = useForm<VerifyFormSchema>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      otp_code: ''
    }
  });
  const [showResetButton, setShowResetButton] = React.useState(false);
  const {
    start,
    reset,
    minutesLeft: minutesLeftToNewReset,
    secondsLeft: secondsLeftToNewReset
  } = useTimer({
    autoStart: true,
    initialTime: 60,
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

  const postResendCodeMutation = useMutation({
    mutationFn: postResendCode,
    onSuccess: ({ data }) => {
      setOtpKey(data.result.otp_key);
      reset();
      start();
      setShowResetButton(false);
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

  return {
    form,
    state: {
      isPending: postVerifyMutation.isPending,
      isResendPending: postResendCodeMutation.isPending,
      minutesLeftToNewReset,
      secondsLeftToNewReset,
      showResetButton
    },
    functions: {
      onSubmit,
      onResendCode
    }
  };
};
