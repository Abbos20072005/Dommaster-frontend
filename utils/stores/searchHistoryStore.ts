import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SearchHistoryStore {
  searchHistory: string[];
  addSearchHistory: (searchTerm: string) => void;
  clearSearchHistory: () => void;
  removeSearchHistory: (searchTerm: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      searchHistory: [],
      addSearchHistory: (searchTerm) =>
        set((state) => {
          if (state.searchHistory.includes(searchTerm)) {
            return { searchHistory: state.searchHistory };
          }
          return { searchHistory: [searchTerm, ...state.searchHistory] };
        }),
      removeSearchHistory: (searchTerm) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((term) => term !== searchTerm)
        })),
      clearSearchHistory: () => set(() => ({ searchHistory: [] }))
    }),
    { name: 'searchHistory', storage: createJSONStorage(() => localStorage) }
  )
);
