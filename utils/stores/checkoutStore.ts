import { create } from 'zustand';

import type { CheckoutPaymentMethod } from '@/utils/constants/checkoutPaymentMethods';

import { DELIVERY_TYPE } from '@/utils/constants';
import { DEFAULT_CHECKOUT_PAYMENT_METHOD } from '@/utils/constants/checkoutPaymentMethods';

// --- ESKI KOD (online / cod + cash/card) ---
// type PaymentOption = 'online' | 'cod';
// type CashMethod = 'cash' | 'card';

interface CheckoutStore {
  branchId: number | null;
  deliveryPrice: string | null;
  deliveryType: DeliveryType;
  // Tanlangan to'lov usuli: uzum / click / payme / cash / atmos
  paymentMethod: CheckoutPaymentMethod;
  // Profilda ism bo'lmasa — checkout'da kiritiladigan qabul qiluvchi ismi
  recipientName: string;
  recipientNameError: boolean;
  // --- ESKI KOD ---
  // paymentOption: PaymentOption;
  // cashMethod: CashMethod;
  // setPaymentOption: (option: PaymentOption) => void;
  // setCashMethod: (method: CashMethod) => void;
  reset: () => void;
  setBranchId: (branchId: number | null) => void;
  setDeliveryPrice: (deliveryPrice: string | null) => void;
  setDeliveryType: (deliveryType: DeliveryType) => void;
  setPaymentMethod: (paymentMethod: CheckoutPaymentMethod) => void;
  setRecipientName: (recipientName: string) => void;
  setRecipientNameError: (recipientNameError: boolean) => void;
}

const initialState = {
  branchId: null,
  deliveryType: DELIVERY_TYPE.Delivery as DeliveryType,
  deliveryPrice: null,
  paymentMethod: DEFAULT_CHECKOUT_PAYMENT_METHOD,
  recipientName: '',
  recipientNameError: false
  // --- ESKI KOD ---
  // paymentOption: 'online',
  // cashMethod: 'cash',
};

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  ...initialState,
  setBranchId: (branchId) => set({ branchId }),
  setDeliveryType: (deliveryType) => set({ deliveryType }),
  setDeliveryPrice: (deliveryPrice) => set({ deliveryPrice }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setRecipientName: (recipientName) => set({ recipientName, recipientNameError: false }),
  setRecipientNameError: (recipientNameError) => set({ recipientNameError }),
  // --- ESKI KOD ---
  // setPaymentOption: (paymentOption) => set({ paymentOption }),
  // setCashMethod: (cashMethod) => set({ cashMethod }),
  reset: () => set(initialState)
}));
