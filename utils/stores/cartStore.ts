import { create } from 'zustand';

interface CartStore {
  cart: CartList | null;
  overallBenefit: number;
  overallPrice: number;
  overallPriceWithDiscount: number;
  setCart: (cart: CartList | null) => void;
}

export const useCart = create<CartStore>()((set) => ({
  cart: null,
  overallPrice: 0,
  overallPriceWithDiscount: 0,
  overallBenefit: 0,
  setCart: (cart) => {
    const overallPrice =
      cart?.cart_items.reduce(
        (acc, item) => acc + (item.is_checked ? item.product.price : 0) * item.quantity,
        0
      ) || 0;
    const overallPriceWithDiscount =
      cart?.cart_items.reduce(
        (acc, item) =>
          acc +
          (item.is_checked ? (item.product.discount_price ?? item.product.price) : 0) *
            item.quantity,
        0
      ) || 0;
    const overallBenefit = overallPrice - overallPriceWithDiscount;
    set({
      cart,
      overallPrice,
      overallPriceWithDiscount,
      overallBenefit
    });
  }
}));
