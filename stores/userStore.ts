import { TripsState, UserState } from '@/interfaces/interfaces';
import { create } from 'zustand';


export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useTripsStore = create<TripsState>((set) => ({
  trips: null,
  setTrips: (trips) => set({trips }),
  clearTrips: () => set({ trips: null }),
}));
