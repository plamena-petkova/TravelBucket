import { UserProps } from '@/interfaces/interfaces';
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user:UserProps) => set({ user }),
}));
