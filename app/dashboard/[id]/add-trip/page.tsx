'use client'
import AlertComponent from '@/components/AlertComponent';
import Autocomplete from '@/components/AutoComplete';
import { Participant } from '@/interfaces/interfaces';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type TripFormState = {
  title: string;
  description?: string;
  startDateTrip: string;
  endDateTrip: string;
  destination: {
    city?: string;
    country?: string;
  };
  accomodation: {
    _id: string;
    name: string;
    address: string;
    checkIn: {
      date: string;
      time: string;
    };
    checkOut: {
      date: string;
      time: string;
    };
    bookingReference?: string;
    type?: "hotel" | "hostel" | "airbnb" | "camping" | "other";
    urlToBooking: string;
    contact?: string;
    notes?: string;
  }
  participants: Participant[];
  createdBy: Participant,
  isPublic: boolean;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  coverImageUrl?: string;
  galleryUrls?: string[];
  tags?: string[];
};

const defaultTrip: TripFormState = {
  title: '',
  description: '',
  startDateTrip: '',
  endDateTrip: '',
  destination: {
    city: '',
    country: ''
  },
  accomodation: {
    _id: '',
    name: '',
    address: '',
    checkIn: {
      date: '',
      time: '',
    },
    checkOut: {
      date: '',
      time: '',
    },
    bookingReference: '',
    type: "hotel",
    urlToBooking: '',
    contact: '',
    notes: '',
  },

  participants: [],
  createdBy: {
    userId: '',
    name: '',
    email: '',
    avatarUrl: '',
  },
  isPublic: false,
  status: 'planned',
  coverImageUrl: '',
  galleryUrls: [],
  tags: [],
};

const TripForm: React.FC = () => {

  const router = useRouter();


  const user = useUserStore((state) => state.user);
  const users = useUserStore((state) => state.users);

  const [trip, setTrip] = useState<TripFormState>(defaultTrip);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (path: string[], value: any) => {
    setTrip(prev => {
      const updated = { ...prev };
      let ref: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]];
      }
      ref[path[path.length - 1]] = value;
      return updated;
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const startDate = new Date(trip.startDateTrip);
    const endDate = new Date(trip.endDateTrip);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      setErrorMessage('Please enter valid start and end dates.');
      return;
    }

    if (startDate <= today) {
      setErrorMessage('Start date must be after today.')
      return;

    }

    if (endDate <= startDate) {
      setErrorMessage('End date must be after start date.')
      return;
    }

    if (user) {
      trip.createdBy.userId = user._id;
      trip.createdBy.email = user.email;
      trip.createdBy.name = user.name || '';
      trip.createdBy.avatarUrl = user.avatarUrl;
    }

    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Trip created with ID:', data.tripId);
        setErrorMessage('');

      } else {
        console.error('Error creating trip:', data.message);
        setErrorMessage(data.error.errors.title.message)
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error')
    }
  };

  const handleBackClick = () => {
    router.back();
  }


  return (
    <div>
      <button className="btn m-3 p-4" onClick={handleBackClick}>Back to dashboard</button>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">

        <h2 className="text-2xl font-bold">Create Trip</h2>
        {errorMessage !== '' && <AlertComponent alertType='alert-error' alertMessage={errorMessage} alertPosition='middle' />}
        <input
          className="input input-bordered w-full"
          placeholder="Trip Title"
          value={trip.title}
          onChange={e => handleChange(['title'], e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          value={trip.description}
          onChange={e => handleChange(['description'], e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Trip Cover Image URL"
          value={trip.coverImageUrl}
          onChange={e => handleChange(['coverImageUrl'], e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="input input-bordered"
            value={trip.startDateTrip}
            onChange={e => handleChange(['startDateTrip'], e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered"
            value={trip.endDateTrip}
            onChange={e => handleChange(['endDateTrip'], e.target.value)}
          />
        </div>

        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Destination</h3>
          <input
            className="input input-bordered w-full my-1"
            placeholder="City"
            value={trip.destination.city}
            onChange={e => handleChange(['destination', 'city'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="Country"
            value={trip.destination.country}
            onChange={e => handleChange(['destination', 'country'], e.target.value)}
          />
        </div>

        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Accomodation</h3>
          <input
            className="input input-bordered w-full my-1"
            placeholder="Accomodation Name"
            value={trip.accomodation.name}
            onChange={e => handleChange(['accomodation', 'name'], e.target.value)}
          />

          <input
            className="input input-bordered w-full my-1"
            placeholder="Accomodation Address"
            value={trip.accomodation.address}
            onChange={e => handleChange(['accomodation', 'address'], e.target.value)}
          />
          <h5 className="text-sm font-semibold">Check In and Out Date and Time</h5>
          <div className="grid grid-cols-2 gap-4">

            <input
              className="input input-bordered w-full my-1"
              type='date'
              placeholder="Accomodation CheckIn date"
              value={trip.accomodation.checkIn.date}
              onChange={e => handleChange(['accomodation', 'checkIn', 'date'], e.target.value)}
            />
            <input
              className="input input-bordered w-full my-1"
              type='time'
              placeholder="Accomodation CheckIn Time"
              value={trip.accomodation.checkIn.time}
              onChange={e => handleChange(['accomodation', 'checkIn', 'time'], e.target.value)}
            />
            <input
              className="input input-bordered w-full my-1"
              type='date'
              placeholder="Accomodation CheckOut date"
              value={trip.accomodation.checkOut.date}
              onChange={e => handleChange(['accomodation', 'checkOut', 'date'], e.target.value)}
            />
            <input
              className="input input-bordered w-full my-1"
              type='time'
              placeholder="Accomodation CheckOut Time"
              value={trip.accomodation.checkOut.time}
              onChange={e => handleChange(['accomodation', 'checkOut', 'time'], e.target.value)}
            />
          </div>
          <input
            className="input input-bordered w-full my-1"
            placeholder="Accomodation Address"
            value={trip.accomodation.type}
            onChange={e => handleChange(['accomodation', 'address'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="Notes"
            value={trip.accomodation.notes}
            onChange={e => handleChange(['accomodation', 'notes'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="Contact"
            value={trip.accomodation.contact}
            onChange={e => handleChange(['accomodation', 'contact'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="Link to the booking"
            value={trip.accomodation.urlToBooking}
            onChange={e => handleChange(['accomodation', 'urlToBooking'], e.target.value)}
          />
        </div>
        <div className="">

          <Autocomplete
            suggestions={users}
            placeholder="Choose a user"
            onChange={(selectedUsers) =>
              handleChange(['participants'], selectedUsers.map((u) => ({
                userId: u._id,
                name: u.name || '',
                email: u.email,
                avatarUrl: u.avatarUrl,
              })))
            }
          />

        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Trip
        </button>
      </form>
    </div>
  );
};

export default TripForm;
