'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreditCardIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { getCustomerCards, patchCustomerCard, postCardBindInit } from '@/utils/api/requests';

const getLastFourDigits = (pan: string) => pan.slice(-4);

export const SavedCardsList = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ['customerCards'],
    queryFn: () => getCustomerCards()
  });

  const cards = cardsQuery.data?.data.result ?? [];

  const bindCardMutation = useMutation({
    mutationFn: postCardBindInit,
    onSuccess: ({ data }) => {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    }
  });

  const setDefaultMutation = useMutation({
    mutationFn: patchCustomerCard,
    onMutate: ({ id }) => {
      queryClient.setQueryData<typeof cardsQuery.data>(['customerCards'], (old) => {
        if (!old) return old;
        const updated = old.data.result.map((card) => ({
          ...card,
          is_default: card.id === id
        }));
        return { ...old, data: { ...old.data, result: updated } };
      });
    }
  });

  const handleSelectCard = (card: CustomerCard) => {
    if (card.is_default || setDefaultMutation.isPending) return;
    setDefaultMutation.mutate({ id: card.id, data: { is_default: true } });
  };

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-medium text-muted-foreground'>{t('Saved cards')}</p>
        <Button
          isLoading={bindCardMutation.isPending}
          size='sm'
          variant='outline'
          onClick={() => bindCardMutation.mutate()}
        >
          <PlusIcon />
          {t('Add card')}
        </Button>
      </div>
      {cardsQuery.isLoading ? (
        <div className='flex justify-center py-4'>
          <Spinner />
        </div>
      ) : cards.length === 0 ? (
        <p className='text-muted-foreground py-4 text-center text-sm'>
          {t('No cards added yet')}
        </p>
      ) : (
        <div className='space-y-2'>
          {cards.map((card) => {
            const isDefault = card.is_default;
            const isSettingDefault =
              setDefaultMutation.isPending &&
              setDefaultMutation.variables?.id === card.id;

            return (
              <div
                key={card.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors',
                  isDefault ? 'border-primary/50 bg-primary/5' : 'border-muted hover:bg-accent/50'
                )}
                onClick={() => handleSelectCard(card)}
              >
                <div
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isDefault ? 'border-primary' : 'border-muted-foreground/40'
                  )}
                >
                  {isDefault && (
                    <div className='bg-primary size-2 rounded-full' />
                  )}
                  {isSettingDefault && (
                    <Spinner className='size-3' />
                  )}
                </div>
                <CreditCardIcon className='text-muted-foreground size-8 shrink-0' />
                <div className='flex-1 min-w-0'>
                  <div className='text-sm font-medium'>
                    {t('Card ending in {last4}', { last4: getLastFourDigits(card.pan) })}
                  </div>
                </div>
                {isDefault && (
                  <Badge variant='outline'>{t('Default')}</Badge>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
