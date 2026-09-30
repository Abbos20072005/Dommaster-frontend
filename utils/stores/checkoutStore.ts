import { create } from 'zustand';

import { DELIVERY_TYPE } from '@/utils/constants';

type PaymentOption = 'online' | 'cod';
type CashMethod = 'cash' | 'card';

interface CheckoutStore {
  branchId: number | null;
  paymentOption: PaymentOption;
  cashMethod: CashMethod;
  deliveryType: DeliveryType;
  deliveryPrice: string | null;
  setBranchId: (branchId: number | null) => void;
  setPaymentOption: (option: PaymentOption) => void;
  setCashMethod: (method: CashMethod) => void;
  setDeliveryType: (deliveryType: DeliveryType) => void;
  setDeliveryPrice: (deliveryPrice: string | null) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  branchId: null,
  paymentOption: 'online',
  cashMethod: 'cash',
  deliveryType: DELIVERY_TYPE.Delivery,
  deliveryPrice: null,
  setBranchId: (branchId) => set({ branchId }),
  setPaymentOption: (paymentOption) => set({ paymentOption }),
  setCashMethod: (cashMethod) => set({ cashMethod }),
  setDeliveryType: (deliveryType) => set({ deliveryType }),
  setDeliveryPrice: (deliveryPrice) => set({ deliveryPrice }),
  reset: () =>
    set({
      branchId: null,
      paymentOption: 'online',
      cashMethod: 'cash',
      deliveryType: DELIVERY_TYPE.Delivery,
      deliveryPrice: null
    })
}));
