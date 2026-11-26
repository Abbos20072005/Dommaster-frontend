'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { trackAddedToCart } from '@/lib/analytics';
import { getOrderById, postCart } from '@/utils/api/requests';

/** "Repeat order": every product of the order goes to the cart again, then the cart opens. */
export const useRepeatOrder = (orderId: number) => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const full = await getOrderById({ id: orderId });
      await Promise.all(
        full.data.result.order_items.map((item) =>
          postCart({ data: { product: item.product.id, quantity: item.quantity } })
        )
      );
      // `add_to_cart` of the repeated order (one event, the quantities of the order)
      void trackAddedToCart(
        full.data.result.order_items.map((item) => ({
          product: item.product,
          quantity: item.quantity
        }))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(t('Products added to the cart'));
      router.push('/cart');
    },
    onError: () => toast.error(t('Something went wrong'))
  });
};
