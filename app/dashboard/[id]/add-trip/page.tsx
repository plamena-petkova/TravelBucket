'use client'
import AlertComponent from '@/components/AlertComponent';
import Autocomplete from '@/components/AutoComplete';
import { TripFormState } from '@/interfaces/interfaces';
import { createTrip } from '@/services/tripService';
import { useTripsStore } from '@/stores/tripStore';
import { useUserStore } from '@/stores/userStore';
import { validateTripDates } from '@/utils/tripValidationDates';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';



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
  transport: {
    typeOfTransport: 'airplane',
    startPoint: '',
    endPoint: '',
    price: '',

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

  const { addTrip } = useTripsStore();


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

    const validationMessage = validateTripDates(trip.startDateTrip, trip.endDateTrip);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    if (user) {
      trip.createdBy.userId = user._id;
      trip.createdBy.email = user.email;
      trip.createdBy.name = user.name || '';
      trip.createdBy.avatarUrl = user.avatarUrl;
    }

    const response = await createTrip(trip);

    if (response.success) {
      setErrorMessage('');
      addTrip(response.data)
      router.push(`/dashboard/${user?._id}/trips`);
    } else {
      setErrorMessage(response.error || 'Something went wrong');
    }
  };

  console.log('Trip', trip);

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">

        <h2 className="text-2xl font-bold">Create Trip</h2>
        {errorMessage !== '' && <AlertComponent alertType='alert-error' alertMessage={errorMessage} alertPosition='middle' />}
        <div className="bg-base-200 p-4 rounded-lg">
          <input
            className="input input-bordered w-full my-1"
            placeholder="Trip Title"
            value={trip.title}
            onChange={e => handleChange(['title'], e.target.value)}
          />

          <textarea
            className="textarea textarea-bordered w-full my-1"
            placeholder="Description"
            value={trip.description}
            onChange={e => handleChange(['description'], e.target.value)}
          />
          <input type="url" className="input validator input-bordered w-full my-1" placeholder="Trip Cover Image https://" value={trip.coverImageUrl}
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
            title="Must be valid URL" onChange={e => handleChange(['coverImageUrl'], e.target.value)} />
          <p className="validator-hint">Must be valid URL</p>
          <h3 className="text-md font-semibold my-1">Period of the trip</h3>
          <div className="flex justify-between gap-4 my-1">

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
        </div>
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="text-md font-semibold">Destination of the trip</h3>
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
          <h3 className="text-md font-semibold">Accomodation</h3>
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
          <select
            className="select select-bordered w-full my-1"
            value={trip.accomodation.type}
            onChange={e => handleChange(['accomodation', 'type'], e.target.value)}
          >
            <option value="">Select Accommodation Type</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="airbnb">Airbnb</option>
            <option value="camping">Camping</option>
            <option value="other">Other</option>
          </select>
          <h5 className="text-sm font-semibold my-1">Check In Date and Time</h5>
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
          </div>
          <h5 className="text-sm font-semibold my-1">Check Out Date and Time</h5>
          <div className="grid grid-cols-2 gap-4">

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
          <input type="url" className="input validator input-bordered w-full my-1" placeholder="Link to the booking https://" value={trip.accomodation.urlToBooking}
            pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
            title="Must be valid URL" onChange={e => handleChange(['accomodation', 'urlToBooking'], e.target.value)} />
          <p className="validator-hint">Must be valid URL</p>

          <input
            className="input input-bordered w-full my-1"
            placeholder="Booking reference"
            value={trip.accomodation.bookingReference}
            onChange={e => handleChange(['accomodation', 'bookingReference'], e.target.value)}
          />
        </div>
        <div className="">
          <select
            className="select select-bordered w-full my-1"
            value={trip.transport.typeOfTransport}
            onChange={e => handleChange(['transport', 'typeOfTransport'], e.target.value)}
          >
            <option value="">Select Transport Type</option>
            <option value="airplane">Airplane</option>
            <option value="car">Car</option>
            <option value="train">Train</option>
            <option value="bus">Bus</option>
            <option value="other">Other</option>
          </select>
          <input
            className="input input-bordered w-full my-1"
            placeholder="Start point"
            value={trip.transport.startPoint}
            onChange={e => handleChange(['transport', 'startPoint'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="End Point"
            value={trip.transport.endPoint}
            onChange={e => handleChange(['transport', 'endPoint'], e.target.value)}
          />
          <input
            className="input input-bordered w-full my-1"
            placeholder="Price of the transport"
            value={trip.transport.price}
            onChange={e => handleChange(['transport', 'price'], e.target.value)}
          />

        </div>
        <div className="">

          <Autocomplete
            suggestions={users}
            onChange={(selectedUsers) =>
              handleChange(['participants'], selectedUsers.map((user) => ({
                userId: user._id,
                name: user.name || '',
                email: user.email,
                avatarUrl: user.avatarUrl,
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
