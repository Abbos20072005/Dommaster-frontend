// Checkout'dagi to'lov usuli: faqat karta bilan onlayn (Atmos). Click, Payme va Uzum yo'q (BLD-531),
// naqd to'lov ham olib tashlandi (BLD-549).
export type CheckoutPaymentMethod = 'atmos';

interface CheckoutPaymentMethodConfig {
  descriptionKey?: string;
  // Brend nomi (tarjima qilinmaydi) yoki tarjima kaliti
  label?: string;
  labelKey?: string;
  // Backend `payment_type` qiymati
  paymentType: number;
  value: CheckoutPaymentMethod;
}

// Backend `payment_type`: karta=1 (PaymentMethod enum bilan bir xil).
// Atmos: `payment_method` branch'idagi kabi 1 yuboriladi, keyin `payment/hold/create/` chaqiriladi.
// TODO: Atmos uchun alohida payment_type bo'lsa — backenddan tasdiqlab, shu yerda o'zgartiring.
export const CHECKOUT_PAYMENT_METHODS: CheckoutPaymentMethodConfig[] = [
  {
    value: 'atmos',
    labelKey: 'Pay online by card',
    descriptionKey: 'Atmos payment',
    paymentType: 1
  }
];

export const DEFAULT_CHECKOUT_PAYMENT_METHOD: CheckoutPaymentMethod = 'atmos';

export const getCheckoutPaymentMethod = (value: CheckoutPaymentMethod) =>
  CHECKOUT_PAYMENT_METHODS.find((method) => method.value === value)!;
