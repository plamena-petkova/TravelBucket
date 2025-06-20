'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip } from '@/services/tripService';
import { TripProps } from '@/interfaces/interfaces';
import { useTripsStore } from '@/stores/userStore';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { env } from 'process';

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
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="flex flex-col items-center p-3 m-3">

          <h1 className='text-3xl'>{trip.title}</h1>
          <p>{trip.description}</p>

        </div>
        <div className="avatar-group -space-x-6">
          <div className="avatar">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12">
              <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
            </div>
          </div>
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-12">
              <span>+99</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-200 p-6 mt-3">
        <div className="flex flex-col sm:flex-row">
          <div className="mr-4">
            <h2 className="text-xl">🗓️ Itinerary</h2>
            <p>From {trip.startDateTrip} to {trip.endDateTrip}</p>
            <h2>{trip.destination?.city}, {trip.destination?.country}</h2>
          </div>
          <div className="">
            <h2 className="text-xl">🏨 Accommodation</h2>
            <p>{trip.accomodation?.name} - {trip.accomodation?.type} <p>{trip.accomodation.bookingReference}</p></p>
            <p>Check In {trip.accomodation?.checkIn?.date.toString()} {trip.accomodation?.checkIn?.time.toString()}</p>
            <p>Check Out {trip.accomodation?.checkOut?.date.toString()} {trip.accomodation?.checkOut?.time.toString()}</p>
            <p>{trip.accomodation?.address}</p>
            <p>{trip.accomodation?.urlToBooking}</p>
            <p>{trip.accomodation?.contact} - {trip.accomodation?.notes}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TripPage;
