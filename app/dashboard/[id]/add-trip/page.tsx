'use client'
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
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  transport: {
    destination: '',
    roundTrip: 'yes' | 'no',
    transportType: 'flight' | 'bus' | 'train';
    transportNumber: '',
    arrivalDate: string,
    departureDate: string,
    price: number,
    pdfTickets: [],
  }[];
  accommodation: {
    coordinates: {
      lat: Number,
      lng: Number,
    },
    bookingId: string,
    address: string,
    checkIn: string,
    checkOut: string,
  };
  participants: {
    userId: string;
    name: string;
    email?: string;
    avatarUrl?: string;
    role: 'admin' | 'member' | 'viewer';
    status: 'invited' | 'joined' | 'declined';
  }[];
  itinerary: any[];
  budget: {
    totalEstimate?: number;
    actualSpent?: number;
    currency: 'USD' | 'BGN' | 'EUR' | 'GBP';
    breakdown?: any[];
  };
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
  notes?: string;
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
  transport: [{
    destination: '',
    roundTrip: 'yes',
    transportType: 'flight',
    transportNumber: '',
    arrivalDate: '',
    departureDate: '',
    price: 0,
    pdfTickets: [],
  }],
  accommodation: {
    coordinates: {
      lat: 0,
      lng: 0,
    },
    bookingId: '',
    address: '',
    checkIn: '',
    checkOut: '',
  },
  participants: [],
  itinerary: [],
  budget: {
    totalEstimate: 0,
    actualSpent: 0,
    currency: 'USD',
    breakdown: [],
  },
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
  notes: '',
};

const TripForm: React.FC = () => {


  const user = useUserStore((state) => state.user);

  const [trip, setTrip] = useState<TripFormState>(defaultTrip);

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

  const handleTransportChange = (index: number, field: string, value: string | number) => {
    const updated = [...trip.transport];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value,
    };
    setTrip({ ...trip, transport: updated });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
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
      // Optionally redirect or show success UI
    } else {
      console.error('Error creating trip:', data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
  // console.log('trip', trip)
};


  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Create Trip</h2>

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
        <input
          className="input input-bordered w-full my-1"
          placeholder="Accommodation"
          value={trip.accommodation.address}
          onChange={e => handleChange(['accommodation', 'address'], e.target.value)}
        />
        <input
          className="input input-bordered w-full my-1"
          placeholder="BookingId"
          value={trip.accommodation.bookingId}
          onChange={e => handleChange(['accommodation', 'bookingId'], e.target.value)}
        />
        <input
          className="input input-bordered w-full my-1"
          placeholder="CheckIn"
          value={trip.accommodation.checkIn}
          onChange={e => handleChange(['accommodation', 'checkIn'], e.target.value)}
        />
        <input
          className="input input-bordered w-full my-1"
          placeholder="CheckOut"
          value={trip.accommodation.checkOut}
          onChange={e => handleChange(['accommodation', 'checkOut'], e.target.value)}
        />
      </div>

      {/* <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Transportation</h3>

        {trip.transport.map((item, index) => (
          <div key={index} className="mb-4 border p-3 rounded-lg bg-base-100">
            <select
              className="select select-bordered"
              value={item.transportType}
              onChange={e => handleTransportChange(index, 'transportType', e.target.value)}
            >
              <option value="admin">Flight</option>
              <option value="member">Bus</option>
              <option value="viewer">Train</option>
            </select>

            <input
              className="input input-bordered w-full mb-2"
              type="date"
              placeholder="Destination"
              value={item.destination}
              onChange={e => handleTransportChange(index, 'destination', e.target.value)}
            />

            <input
              className="input input-bordered w-full mb-2"
              type="date"
              placeholder="Destination"
              value={item.departureDate}
              onChange={e => handleTransportChange(index, 'departureDate', e.target.value)}
            />

            <input
              className="input input-bordered w-full mb-2"
              type="text"
              placeholder="Destination"
              value={item.departureDate}
              onChange={e => handleTransportChange(index, 'destination', e.target.value)}
            />

            <input
              className="input input-bordered w-full"
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={e => handleTransportChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
      </div>


      <div className="bg-base-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Budget</h3>
        <input
          className="input input-bordered my-1"
          placeholder="Currency"
          value={trip.budget.currency}
          onChange={e => handleChange(['budget', 'currency'], e.target.value)}
        />
        <input
          type="number"
          className="input input-bordered my-1"
          placeholder="Total Estimate"
          value={trip.budget.totalEstimate}
          onChange={e => handleChange(['budget', 'totalEstimate'], +e.target.value)}
        />
        <input
          type="number"
          className="input input-bordered my-1"
          placeholder="Actual Spent"
          value={trip.budget.actualSpent}
          onChange={e => handleChange(['budget', 'actualSpent'], +e.target.value)}
        />
      </div>



      <div className="bg-base-200 p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Participants</h3>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() =>
              setTrip(prev => ({
                ...prev,
                participants: [
                  ...prev.participants,
                  {
                    userId: '',
                    name: '',
                    email: '',
                    avatarUrl: '',
                    role: 'member',
                    status: 'invited',
                  },
                ],
              }))
            }
          >
            + Add
          </button>
        </div>
        {trip.participants.map((p, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <input
              className="input input-bordered"
              placeholder="Name"
              value={p.name}
              onChange={e => {
                const updated = [...trip.participants];
                updated[i].name = e.target.value;
                setTrip({ ...trip, participants: updated });
              }}
            />
            <input
              className="input input-bordered"
              placeholder="Email"
              value={p.email}
              onChange={e => {
                const updated = [...trip.participants];
                updated[i].email = e.target.value;
                setTrip({ ...trip, participants: updated });
              }}
            />
            <select
              className="select select-bordered"
              value={p.role}
              onChange={e => {
                const updated = [...trip.participants];
                updated[i].role = e.target.value as 'admin' | 'member' | 'viewer';
                setTrip({ ...trip, participants: updated });
              }}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        ))}
      </div> */}

      <button type="submit" className="btn btn-primary w-full">
        Submit Trip
      </button>
    </form>
  );
};

export default TripForm;
