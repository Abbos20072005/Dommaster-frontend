import { create } from 'zustand';

interface CartStore {
  cartItemsLength: number;
  cartItemsQuantityMap: Record<number, number>;
  getIsCartItemsSynced: (cartItems: CartItem[]) => boolean;
  setCartItemQuantity: (productId: number, quantity: number) => void;
  syncCart: (cart: CartList) => void;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  cartItemsQuantityMap: {},
  cartItemsLength: 0,

  setCartItemQuantity: (productId, quantity) => {
    set((state) => {
      const cartItemsQuantityMap = { ...state.cartItemsQuantityMap, [productId]: quantity };
      return {
        cartItemsQuantityMap,
        cartItemsLength: Object.values(cartItemsQuantityMap).filter((quantity) => quantity > 0)
          .length
      };
    });
  },

  getIsCartItemsSynced: (cartItems) => {
    const { cartItemsQuantityMap, cartItemsLength } = get();

    if (cartItemsLength !== cartItems.length) {
      return false;
    }

    for (const item of cartItems) {
      if (cartItemsQuantityMap[item.product.id] !== item.quantity) {
        return false;
      }
    }

    return true;
  },

  syncCart: (cart) => {
    set({
      cartItemsQuantityMap: cart.cart_items.reduce(
        (acc, item) => ({ ...acc, [item.product.id]: item.quantity }),
        {} as Record<number, number>
      ),
      cartItemsLength: cart.cart_items.length
    });
  }
}));
