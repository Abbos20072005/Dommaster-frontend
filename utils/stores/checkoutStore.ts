import { create } from 'zustand';

type PaymentOption = 'online' | 'cod';
type CashMethod = 'cash' | 'card';

interface CheckoutStore {
  paymentOption: PaymentOption;
  cashMethod: CashMethod;
  setPaymentOption: (option: PaymentOption) => void;
  setCashMethod: (method: CashMethod) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  paymentOption: 'online',
  cashMethod: 'cash',
  setPaymentOption: (paymentOption) => set({ paymentOption }),
  setCashMethod: (cashMethod) => set({ cashMethod }),
  reset: () => set({ paymentOption: 'online', cashMethod: 'cash' })
}));
