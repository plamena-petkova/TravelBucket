'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip } from '@/services/tripService';
import { TripProps } from '@/interfaces/interfaces';


const TripPage = () => {
  const params = useParams();
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const data = await fetchTrip(params.id as string);
        if (!data) {
          setError('Trip not found');
        } else {
          setTrip(data);
        }
      } catch (err) {
        setError('Failed to fetch trip');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      getTrip();
    }
  }, [params.id]);

  if (loading) return <div>Loading trip...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>Trip not found.</div>;

  return (
    <div className="">
      <div className="flex carousel w-full items-center">
        <div id={trip._id} className="carousel-item w-full h-36">
          <img
            src={trip.coverImageUrl}
            className="w-full object-cover" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href={trip._id} className="btn btn-xs">1</a>
      </div>
      <div className="flex flex-col items-center">
        <h1>{trip.title}</h1>
        <p>{trip.description}</p>
        <p>From {trip.startDateTrip} to {trip.endDateTrip}</p>
        <h2>{trip?.destination?.city}</h2>
        <p>{trip?.destination?.country}</p>
        <h2>Accomodation</h2>
        <p>{trip?.accomodation?.type}</p>
      </div>
  
    </div>
  );
};

export default TripPage;
