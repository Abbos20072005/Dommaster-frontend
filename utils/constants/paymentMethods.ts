export const paymentMethodMap: Record<
  PaymentMethod,
  {
    label: string;
    image: string;
  }
> = {
  1: {
    label: 'Click Uz',
    image: '/payments/click.png'
  },
  2: {
    label: 'Payme',
    image: '/payments/payme.png'
  },
  3: {
    label: 'Uzum',
    image: '/payments/uzum.png'
  }
};

export const paymentMethods = Object.entries(paymentMethodMap).map(([key, value]) => ({
  value: key,
  label: value.label,
  image: value.image
}));
