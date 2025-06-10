import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Trip from '@/models/Trip'; 

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Optional: Validate input here

    const newTrip = new Trip({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTrip = await newTrip.save();

    return NextResponse.json({ message: 'Trip created', tripId: savedTrip._id }, { status: 201 });
  } catch (error) {
    console.error('Trip creation error:', error);
    return NextResponse.json({ message: 'Failed to create trip', error }, { status: 500 });
  }
}


export async function GET() {
  await connectDB();


  const trips = await Trip.find().lean();

  if (!trips) {
    return NextResponse.json({ message: 'No trips found' }, { status: 404 });
  }

  return NextResponse.json(trips);
}

