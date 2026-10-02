'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreditCardIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { getCustomerCards, patchCustomerCard, postCardBindInit } from '@/utils/api/requests';

export const CUSTOMER_CARDS_QUERY_KEY = ['customerCards'];

// Backend karta raqamini turli nomdagi maydonda qaytarishi mumkin (pan, masked_pan, card_number...)
const CARD_NUMBER_FIELDS = [
  'pan',
  'masked_pan',
  'card_pan',
  'card_number',
  'number',
  'card_mask',
  'mask'
];
const IGNORED_FIELDS = new Set([
  'id',
  'card_id',
  'token',
  'card_token',
  'expiry',
  'expire',
  'phone'
]);

const getCardNumber = (card: CustomerCard): string => {
  const record = card as unknown as Record<string, unknown>;
  for (const field of CARD_NUMBER_FIELDS) {
    const value = record[field];
    if (typeof value === 'string' && /\d{4}\D*$/.test(value)) return value;
  }
  // Boshqa nomdagi maydon bo'lsa: niqoblangan raqamga o'xshash qiymatni qidiramiz (masalan 986017******2803)
  for (const [key, value] of Object.entries(record)) {
    if (IGNORED_FIELDS.has(key) || typeof value !== 'string') continue;
    if (/[*x•]/i.test(value) && /\d{4}\D*$/.test(value)) return value;
  }
  return '';
};

const getLastFourDigits = (card: CustomerCard) => getCardNumber(card).replace(/\D/g, '').slice(-4);

// Karta turini raqam boshidan aniqlaymiz
const getCardBrand = (card: CustomerCard) => {
  const digits = getCardNumber(card).replace(/\D/g, '');
  if (digits.startsWith('9860')) return 'Humo';
  if (digits.startsWith('8600') || digits.startsWith('5614')) return 'UzCard';
  if (digits.startsWith('4')) return 'Visa';
  if (/^(?:5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  return '';
};

// Faqat raqami bor (haqiqatan ulangan) kartalar ko'rsatiladi
// Tartib id bo'yicha qat'iy: asosiy karta almashganda backend ro'yxatni qayta tartiblasa ham
// kartalar joyi o'zgarmaydi
export const getSavedCards = (cards: CustomerCard[] | undefined) =>
  (cards ?? []).filter((card) => getLastFourDigits(card).length === 4).sort((a, b) => a.id - b.id);

export const SavedCardsList = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: CUSTOMER_CARDS_QUERY_KEY,
    queryFn: () => getCustomerCards(),
    staleTime: 0,
    // Karta Atmos sahifasida (yangi tabda) qo'shiladi — foydalanuvchi qaytganda ro'yxat yangilanadi
    refetchOnWindowFocus: true
  });

  const cards = getSavedCards(cardsQuery.data?.data.result);

  const bindCardMutation = useMutation({
    mutationFn: postCardBindInit,
    onSuccess: ({ data }) => {
      // Atmos sessiyasi faqat BIR marta ochilishi kerak (ikkinchi ochilish "Noto'g'ri qo'ng'iroq tartibi" xatosini beradi).
      // 'noopener' bilan window.open doim null qaytaradi — natijasini tekshirmaymiz.
      window.open(data.url, '_blank', 'noopener,noreferrer');
      toast(t('After adding the card, return to this page'));
    }
  });

  const setDefaultMutation = useMutation({
    mutationFn: patchCustomerCard,
    onMutate: ({ id }) => {
      const previous = queryClient.getQueryData<typeof cardsQuery.data>(CUSTOMER_CARDS_QUERY_KEY);
      queryClient.setQueryData<typeof cardsQuery.data>(CUSTOMER_CARDS_QUERY_KEY, (old) => {
        if (!old) return old;
        const result = old.data.result.map((card) => ({ ...card, is_default: card.id === id }));
        return { ...old, data: { ...old.data, result } };
      });
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(CUSTOMER_CARDS_QUERY_KEY, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: CUSTOMER_CARDS_QUERY_KEY })
  });

  const onSelectCard = (card: CustomerCard) => {
    if (card.is_default || setDefaultMutation.isPending) return;
    setDefaultMutation.mutate({ id: card.id, data: { is_default: true } });
  };

  if (cardsQuery.isLoading) {
    return <Skeleton className='h-24 w-full rounded-xl' />;
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-muted-foreground text-xs font-medium'>{t('Saved cards')}</p>
        <Button
          size='sm'
          type='button'
          variant='outline'
          isLoading={bindCardMutation.isPending}
          onClick={() => bindCardMutation.mutate()}
        >
          <PlusIcon />
          {t('Add card')}
        </Button>
      </div>

      {!cards.length ? (
        <p className='text-muted-foreground py-4 text-center text-sm'>{t('No cards added yet')}</p>
      ) : (
        <div className='space-y-2' role='radiogroup'>
          {cards.map((card) => {
            const isDefault = card.is_default;
            const isUpdating =
              setDefaultMutation.isPending && setDefaultMutation.variables?.id === card.id;

            return (
              <button
                key={card.id}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors',
                  isDefault
                    ? 'border-primary/50 bg-primary/5'
                    : 'bg-background hover:border-primary/20 border-transparent'
                )}
                aria-checked={isDefault}
                type='button'
                onClick={() => onSelectCard(card)}
                role='radio'
              >
                <span
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isDefault ? 'border-primary' : 'border-muted-foreground/40'
                  )}
                >
                  {isUpdating ? (
                    <Spinner className='size-3' />
                  ) : (
                    isDefault && <span className='bg-primary size-2 rounded-full' />
                  )}
                </span>
                <CreditCardIcon className='text-muted-foreground size-8 shrink-0' />
                <span className='min-w-0 flex-1 truncate text-sm font-medium'>
                  {getCardBrand(card) || t('Card')} •••• {getLastFourDigits(card)}
                </span>
                {isDefault && <Badge variant='outline'>{t('Default')}</Badge>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
