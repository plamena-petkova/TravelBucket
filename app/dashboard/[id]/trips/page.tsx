'use client';

import { useEffect, useState } from 'react';
import { useTripsStore } from '@/stores/tripStore';
import { useParams } from 'next/navigation';
import TripCard from '@/components/TripCard';
import { TripProps } from '@/interfaces/interfaces';
import { fetchTrips } from '@/services/tripService';

export default function TripsPage() {
  const { id } = useParams() as { id: string };
  const allTrips = useTripsStore((state) => state.trips);
  const setTrips = useTripsStore((state) => state.setTrips);
  const [userTrips, setUserTrips] = useState<TripProps[]>([]);


  useEffect(() => {
    const loadTrips = async () => {
      const data = await fetchTrips();
      setTrips(data);
    };
    loadTrips();
  }, [setTrips]);


 useEffect(() => {
    if (allTrips && id) {
      const filtered = allTrips.filter((trip) => {
        const isCreator = trip.createdBy?.userId === id;
        const isParticipant = trip.participants?.some(p => p.userId === id);
        return isCreator || isParticipant;
      });

      setUserTrips(filtered);
    }
  }, [allTrips, id]);




  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Trips</h2>
      {userTrips.length > 0 ? (
        <div className="flex flex-wrap">{userTrips.map(trip => (
          <TripCard key={trip._id} trip={trip} />
        ))}</div>
      ) : (
        <p className="text-center mt-8 text-gray-500">✈️ You don't have any trips yet.</p>
      )}
    </div>
  );
}
