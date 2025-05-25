import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { postPromoCodeChecker } from '@/utils/api/requests';

interface Props {
  value: (PromoCodeChecker & { code: string }) | undefined;
  onSuccess: (code: PromoCodeChecker & { code: string }) => void;
}

export const PromoCodeChecker = ({ value, onSuccess }: Props) => {
  const t = useTranslations();
  const [promoCodeInput, setPromoCodeInput] = React.useState<string>('');

  const postPromoCodeCheckerMutation = useMutation({
    mutationFn: postPromoCodeChecker,
    onSuccess: ({ data }) => {
      onSuccess({ ...data.result, code: promoCodeInput });
    },
    onError: () => {
      setPromoCodeInput('');
    }
  });

  const onSubmit = () => {
    if (!promoCodeInput) return;
    postPromoCodeCheckerMutation.mutate({ data: { promocode: promoCodeInput } });
  };

  return (
    <form
      className='relative flex items-center justify-between gap-2'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Input
        value={promoCodeInput}
        onChange={(e) => setPromoCodeInput(e.target.value)}
        placeholder={t('Promo code')}
      />
      <Button
        disabled={
          !promoCodeInput ||
          postPromoCodeCheckerMutation.isPending ||
          value?.code === promoCodeInput
        }
        type='submit'
        variant='secondary'
      >
        <Spinner show={postPromoCodeCheckerMutation.isPending} />
        {t('Apply')}
      </Button>
    </form>
  );
};
