import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useTimer } from '@/hooks';
import { postResendCode, postResetPasswordVerify } from '@/utils/api/requests';

import type { VerifyFormSchema } from '../constants';

import { verifyFormSchema } from '../constants';

interface Props {
  otpKey: string;
  onSuccess?: (data: ResetPasswordVerifyResponse) => void;
  setOtpKey: (otpKey: string) => void;
}

export const useResetPasswordVerifyForm = ({ otpKey, setOtpKey, onSuccess }: Props) => {
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

  const postVerifyMutation = useMutation({
    mutationFn: postResetPasswordVerify,
    onSuccess: ({ data }) => {
      onSuccess?.(data);
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
