'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip } from '@/services/tripService';

type Trip = {
  _id: string;
  title: string;
  description: string;
  startDateTrip: string;
  endDateTrip: string;
  destination: { city: string; country: string };
  coverImageUrl: string;
};

const TripPage = () => {
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
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
    <div>
      <h1>{trip.title}</h1>
      <p>{trip.description}</p>
      <p>
        {trip.destination.city}, {trip.destination.country}
      </p>
      <p>
        From {trip.startDateTrip} to {trip.endDateTrip}
      </p>
      {trip.coverImageUrl && (
        <img
          src={trip.coverImageUrl}
          alt={`Cover for ${trip.title}`}
          style={{ width: '400px', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default TripPage;
