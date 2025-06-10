import { TripProps } from '@/interfaces/interfaces';
import mongoose, { Schema } from 'mongoose';

const TripSchema = new Schema<TripProps>(
  {
    title: { type: String, required: true, minlength:4 },
    description:{ type: String, maxlength:100 },
    startDateTrip: { type: String, required: true },
    endDateTrip: { type: String, required: true },

    destination: {
      city:  { type: String, required: true },
      country:  { type: String, required: true },
    },


    participants: [
      {
        userId: { type: String, required: true },
        name: String,
        email: String,
        avatarUrl: String,
      },
    ],

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

const Trip = mongoose.models.Trip || mongoose.model('Trip', TripSchema);

export default Trip;