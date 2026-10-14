import { create } from 'zustand';

interface SessionState {
  /** an authorized request got 401 and the token could not be refreshed */
  expired: boolean;
  setExpired: (expired: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  expired: false,
  setExpired: (expired) => set({ expired })
}));
