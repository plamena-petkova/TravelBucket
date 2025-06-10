'use client';
import { TripProps, UserProps } from '@/interfaces/interfaces';
import { fetchTrips, fetchUser } from '@/services/userService';
import { useTripsStore, useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const AppInitializer = () => {
  const { setUser } = useUserStore();
  const { setTrips } = useTripsStore();

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery<UserProps, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const {
    data: tripsData,
    error: tripsError,
    isLoading: isTripsLoading,
  } = useQuery<TripProps[], Error>({
    queryKey: ['trips'],
    queryFn: fetchTrips,
  });

  useEffect(() => {
    if (userData) setUser(userData);
    if (tripsData) setTrips(tripsData);
  }, [userData, setUser, tripsData, setTrips]);

  if (isUserLoading || isTripsLoading) return null;
  if (userError || tripsError) return null;

  return null;
};
