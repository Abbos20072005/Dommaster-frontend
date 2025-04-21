import { create } from 'zustand';

interface FavoritesStore {
  favorites: Favorite[] | null;
  setFavorites: (cart: Favorite[] | null) => void;
}

export const useFavorites = create<FavoritesStore>()((set) => ({
  favorites: null,
  setFavorites: (favorites) => set({ favorites })
}));
