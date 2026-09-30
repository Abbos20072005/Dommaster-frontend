// Checkout'dagi to'lov usullari (ko'rinish tartibi: Uzum, Click, Payme, Naqd, Atmos)
export type CheckoutPaymentMethod = 'atmos' | 'cash' | 'click' | 'payme' | 'uzum';

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

// Backend `payment_type`: Click=1, Payme=2, Uzum=3, Naqd=4 (PaymentMethod enum bilan bir xil).
// Atmos: `payment_method` branch'idagi kabi 1 yuboriladi, keyin `payment/hold/create/` chaqiriladi.
// TODO: Atmos uchun alohida payment_type bo'lsa — backenddan tasdiqlab, shu yerda o'zgartiring.
export const CHECKOUT_PAYMENT_METHODS: CheckoutPaymentMethodConfig[] = [
  { value: 'uzum', label: 'Uzum', image: '/payments/uzum.png', paymentType: 3 },
  { value: 'click', label: 'Click', image: '/payments/click.png', paymentType: 1 },
  { value: 'payme', label: 'Payme', image: '/payments/payme.png', paymentType: 2 },
  {
    value: 'cash',
    labelKey: 'Cash',
    image: '/payments/cash.png',
    paymentType: 4,
    paymentMethod: 'cash'
  },
  {
    value: 'atmos',
    labelKey: 'Pay online by card',
    descriptionKey: 'Atmos payment',
    paymentType: 1
  }
];

export const DEFAULT_CHECKOUT_PAYMENT_METHOD: CheckoutPaymentMethod = 'cash';

export const getCheckoutPaymentMethod = (value: CheckoutPaymentMethod) =>
  CHECKOUT_PAYMENT_METHODS.find((method) => method.value === value)!;
