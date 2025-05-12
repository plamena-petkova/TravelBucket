'use client';
import { UserProps } from '@/interfaces/interfaces';
import { fetchUser } from '@/services/userService';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';



export const AppInitializer = () => {
  const { setUser } = useUserStore();

  const { data, error, isLoading } = useQuery<UserProps, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  if (isLoading) return null;
  if (error) return null;

  return null;
};
