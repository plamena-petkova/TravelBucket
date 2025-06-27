import { TripsState } from "@/interfaces/interfaces";
import { create } from "zustand";


export const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, trip],
    })),
  clearTrips: () => set({ trips: [] }),
}));
