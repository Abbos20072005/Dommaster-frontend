// Checkout'dagi to'lov usullari: karta bilan onlayn (Atmos) va naqd. Click, Payme va Uzum yo'q (BLD-531).
export type CheckoutPaymentMethod = 'atmos' | 'cash';

interface CheckoutPaymentMethodConfig {
  descriptionKey?: string;
  // Ro'yxatda rasm bo'lmasa (Atmos) — ikonka chiqadi
  image?: string;
  // Brend nomi (tarjima qilinmaydi) yoki tarjima kaliti
  label?: string;
  labelKey?: string;
  // Backend `payment_method` (faqat naqd uchun)
  paymentMethod?: 'card' | 'cash';
  // Backend `payment_type` qiymati
  paymentType: number;
  value: CheckoutPaymentMethod;
}

// Backend `payment_type`: karta=1, Naqd=4 (PaymentMethod enum bilan bir xil).
// Atmos: `payment_method` branch'idagi kabi 1 yuboriladi, keyin `payment/hold/create/` chaqiriladi.
// TODO: Atmos uchun alohida payment_type bo'lsa — backenddan tasdiqlab, shu yerda o'zgartiring.
export const CHECKOUT_PAYMENT_METHODS: CheckoutPaymentMethodConfig[] = [
  {
    value: 'atmos',
    labelKey: 'Pay online by card',
    descriptionKey: 'Atmos payment',
    paymentType: 1
  },
  // Naqd: kuryerga yoki (olib ketishda) do'konda to'lanadi
  {
    value: 'cash',
    labelKey: 'Cash',
    descriptionKey: 'Cash on delivery',
    image: '/payments/cash.png',
    paymentType: 4,
    paymentMethod: 'cash'
  }
];

export const DEFAULT_CHECKOUT_PAYMENT_METHOD: CheckoutPaymentMethod = 'atmos';

export const getCheckoutPaymentMethod = (value: CheckoutPaymentMethod) =>
  CHECKOUT_PAYMENT_METHODS.find((method) => method.value === value)!;
