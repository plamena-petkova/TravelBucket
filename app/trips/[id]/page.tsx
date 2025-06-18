'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip } from '@/services/tripService';
import { TripProps } from '@/interfaces/interfaces';
import { useTripsStore } from '@/stores/userStore';

const TripPage = () => {
  const params = useParams();
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trips = useTripsStore((state) => state.trips);

  useEffect(() => {
    if (!params.id) return;

    const localTrip = trips?.find((trip) => trip._id === params.id);
    if (localTrip) {
      setTrip(localTrip);
    } else {
      fetchTrip(params.id as string)
        .then((data) => {
          if (!data) {
            setError('Trip not found');
          } else {
            setTrip(data);
          }
        })
        .catch(() => setError('Failed to fetch trip'));
    }
  }, [params.id, trips]);

  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Loading trip...</div>;

  return (
    <div className="">
      <div className="flex carousel w-full items-center">
        <div id={trip._id} className="carousel-item w-full h-52">
          <img
            src={trip.coverImageUrl}
            className="w-full object-cover"
            alt={trip.title}
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href={trip._id} className="btn btn-xs">1</a>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="h1 font-bold">{trip.title}</h1>
        <p>{trip.description}</p>
        <p>From {trip.startDateTrip} to {trip.endDateTrip}</p>
        <h2>{trip.destination?.city}</h2>
        <p>{trip.destination?.country}</p>
        <h2>Accommodation</h2>
        <p>{trip.accomodation?.type}</p>
      </div>
    </div>
  );
};

export default TripPage;
