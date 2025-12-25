import { create } from 'zustand';

interface FavoritesStore {
  favorites: Product[];
  favoritesMap: Record<number, Product>;
  isFavorite: (productId: number) => boolean;
  setFavorites: (favorites: Product[] | null) => void;
  toggleFavorite: (product: Product) => void;
}

export const useFavorites = create<FavoritesStore>()((set, get) => ({
  favorites: [],
  favoritesMap: {},

  toggleFavorite: (product) => {
    set((state) => {
      const { favoritesMap, favorites } = state;
      if (favoritesMap[product.id]) {
        const { [product.id]: _, ...rest } = favoritesMap;
        return {
          favoritesMap: rest,
          favorites: favorites.filter((fav) => fav.id !== product.id)
        };
      } else {
        return {
          favoritesMap: { ...favoritesMap, [product.id]: product },
          favorites: [...favorites, product]
        };
      }
    });
  },

  isFavorite: (productId: number) => {
    return productId in get().favoritesMap;
  },

  setFavorites: (favorites) => {
    if (!favorites || favorites.length === 0) {
      set({ favoritesMap: {}, favorites: [] });
      return;
    }

    const favoritesMap: Record<number, Product> = {};
    favorites.forEach((favorite) => {
      favoritesMap[favorite.id] = favorite;
    });

    set({ favoritesMap, favorites });
  },
  getFavoriteProducts: () => {
    return Object.values(get().favoritesMap);
  }
}));
