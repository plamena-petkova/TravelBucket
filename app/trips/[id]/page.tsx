'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTrip } from '@/services/tripService';
import { TripProps } from '@/interfaces/interfaces';
import { useTripsStore } from '@/stores/tripStore';
import Link from 'next/link';

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

  console.log('Trip', trip)

  return (
    <div className="">
      <div className="flex carousel w-full items-center">
        <div id={trip._id} className="carousel-item w-full h-52">
          {trip.coverImageUrl ? <img
            src={trip.coverImageUrl}
            alt={trip.coverImageUrl?.at(3)}
            className="w-full h-full object-cover"
          /> : <img
            src="/assets/genericTripPicture.jpg"
            className="w-full h-full object-cover"
            alt="Genric Photo"
          />}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div className="flex flex-col items-center p-3 m-3">

          <h1 className='text-3xl'>{trip.title}</h1>
          <p>{trip.description}</p>

        </div>
        <div className="avatar-group -space-x-6">
          {trip.participants.map((participant) => {
            return <div className="avatar" key={participant.userId}>
              <div className="w-12">
                <img src={participant.avatarUrl} />
              </div>
            </div>
          })}

        </div>
      </div>
      <div className="card bg-base-200 p-6 mt-3">
        <div className="flex flex-col sm:flex-row">
          <div className="p-4 mr-4">
            <h2 className="text-xl">🗓️ Itinerary</h2>
            <p>From {trip.startDateTrip} to {trip.endDateTrip}</p>
            <h2>{trip.destination?.city}, {trip.destination?.country}</h2>
          </div>
          <div className="p-4">
            <h2 className="text-xl">🏨 Accommodation</h2>
            <p>{trip.accomodation?.name} - {trip.accomodation?.type} {trip.accomodation?.bookingReference}</p>
            <p>Check In {trip.accomodation?.checkIn?.date.toString()} {trip.accomodation?.checkIn?.time.toString()}</p>
            <p>Check Out {trip.accomodation?.checkOut?.date.toString()} {trip.accomodation?.checkOut?.time.toString()}</p>
            <p>{trip.accomodation?.address}</p>
            <p>{trip.accomodation?.contact} - {trip.accomodation?.notes}</p>
            <Link className="link link-accent" href={trip.accomodation?.urlToBooking || ''} target='_blank'>Link to booking</Link>
          </div>
          <div className="p-4 mr-4">
            <h2 className="text-xl">✈️ Transportation</h2>
            {!trip.transport ? <div>No Transport selected yet</div> :
              <div className="">
                <p>{trip.transport?.typeOfTransport}</p>
                <p>{trip.transport?.startPoint} - {trip.transport?.endPoint}</p>
                <p>{trip.transport?.price}</p>
              </div>}

          </div>
        </div>
      </div>

    </div>
  );
};

export default TripPage;
