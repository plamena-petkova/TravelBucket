import { TripsState, UserProps, UserState } from "@/interfaces/interfaces";
import { create } from "zustand";

type UserStore = {
  [x: string]: any;
  user: UserProps | null;
  users: UserProps[];
  setUser: (user: UserProps) => void;
  setUsers: (users: UserProps[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  clearUser: () => set({ user: null }),
}));

export const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, trip],
    })),
  clearTrips: () => set({ trips: [] }),
}));
