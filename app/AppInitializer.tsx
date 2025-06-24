'use client';

import { TripProps, UserProps } from '@/interfaces/interfaces';
import { fetchTrips } from '@/services/tripService';
import { fetchUser, fetchUsers } from '@/services/userService';
import { useTripsStore, useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const AppInitializer = () => {
  const { setUser, setUsers } = useUserStore();
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
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery<UserProps[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    data: tripsData,
    error: tripsError,
    isLoading: isTripsLoading,
  } = useQuery<TripProps[], Error>({
    queryKey: ['trips'],
    queryFn: fetchTrips,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (userData) setUser(userData);
    if (usersData) setUsers(usersData);
    if (tripsData) setTrips(tripsData);
  }, [userData, usersData, tripsData, setUser, setUsers, setTrips]);

  if (isUserLoading || isTripsLoading || isUsersLoading) return null;
  if (userError || tripsError || usersError) return null;

  return null;
};
