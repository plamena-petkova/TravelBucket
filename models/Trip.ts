import { TripProps } from '@/interfaces/interfaces';
import mongoose, { Schema } from 'mongoose';

const TripSchema = new Schema<TripProps>(
  {
    title: { type: String, required: true },
    description: String,
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    destination: {
      city: String,
      country: String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    transport: [
      {
        mode: { type: String, enum: ['flight', 'train', 'car', 'bus', 'boat', 'other'] },
        provider: String,
        bookingReference: String,
        departureTime: String,
        arrivalTime: String,
        from: String,
        to: String,
        notes: String,
      },
    ],

    accommodation: [
      {
        name: String,
        address: String,
        checkIn: String,
        checkOut: String,
        bookingReference: String,
        type: { type: String, enum: ['hotel', 'hostel', 'airbnb', 'camping', 'other'] },
        contact: String,
        notes: String,
      },
    ],

    participants: [
      {
        userId: { type: String, required: true },
        name: String,
        email: String,
        avatarUrl: String,
        role: { type: String, enum: ['admin', 'member', 'viewer'] },
        status: { type: String, enum: ['invited', 'joined', 'declined'] },
      },
    ],

    itinerary: [
      {
        date: String,
        activities: [
          {
            time: String,
            title: String,
            description: String,
            location: String,
            imageUrl: String,
            cost: Number,
          },
        ],
      },
    ],

    budget: {
      totalEstimate: Number,
      actualSpent: Number,
      currency: String,
      breakdown: [
        {
          category: { type: String, enum: ['transport', 'accommodation', 'food', 'activity', 'misc'] },
          estimate: Number,
          spent: Number,
        },
      ],
    },

    createdBy: {
      userId: { type: String, required: true },
      name: String,
      email: String,
    },

    isPublic: { type: Boolean, default: false },
    status: { type: String, enum: ['planned', 'ongoing', 'completed', 'cancelled'], default: 'planned' },
    coverImageUrl: String,
    galleryUrls: [String],
    tags: [String],
    notes: String,
  },
  { timestamps: true }
);

const Trip = mongoose.model<TripProps>('Trip', TripSchema);

export default Trip;