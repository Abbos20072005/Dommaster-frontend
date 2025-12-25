import { create } from 'zustand';

interface CartStore {
  cartItemsLength: number;
  cartItemsQuantityMap: Record<number, number>;
  getCartItemQuantity: (productId: number) => number;
  setCartItemQuantity: (productId: number, quantity: number) => void;
  setCartItems: (items: Array<{ productId: number; quantity: number }>) => void;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  cartItemsQuantityMap: {},
  cartItemsLength: 0,
  getCartItemQuantity: (productId) => get().cartItemsQuantityMap[productId] ?? 0,

  setCartItems: (items) => {
    set({
      cartItemsQuantityMap: items.reduce(
        (acc, item) => ({ ...acc, [item.productId]: item.quantity }),
        {} as Record<number, number>
      ),
      cartItemsLength: items.length
    });
  },

  setCartItemQuantity: (productId, quantity) => {
    set((state) => {
      const cartItemsQuantityMap = { ...state.cartItemsQuantityMap, [productId]: quantity };
      return {
        cartItemsQuantityMap,
        cartItemsLength: Object.values(cartItemsQuantityMap).filter((quantity) => quantity > 0)
          .length
      };
    });
  }
}));
