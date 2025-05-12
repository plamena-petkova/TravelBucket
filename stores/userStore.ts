import { UserState } from '@/interfaces/interfaces';
import { create } from 'zustand';


export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
