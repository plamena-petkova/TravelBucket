'use client'
import AlertComponent from '@/components/AlertComponent';
import { useUserStore } from '@/stores/userStore';
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
  participants: {
    userId: string;
    name: string;
    email?: string;
    avatarUrl?: string;
  }[];
  createdBy: {
    userId: string;
    name: string;
    email?: string;
  };
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
  participants: [],
  createdBy: {
    userId: '',
    name: '',
    email: '',
  },
  isPublic: false,
  status: 'planned',
  coverImageUrl: '',
  galleryUrls: [],
  tags: [],
};

const TripForm: React.FC = () => {


  const user = useUserStore((state) => state.user);

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
        // Optionally redirect or show success UI
      } else {
        console.error('Error creating trip:', data.message);
        setErrorMessage(data.error.errors.title.message)
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error')
    }
  };



  return (
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

      <button type="submit" className="btn btn-primary w-full">
        Submit Trip
      </button>
    </form>
  );
};

export default TripForm;
