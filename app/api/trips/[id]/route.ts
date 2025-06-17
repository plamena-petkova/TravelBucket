import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Trip from '@/models/Trip';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const trip = await Trip.findById(params.id).lean();

    console.log('trip', trip);

    if (!trip) {
      return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Error fetching trip by ID:', error);
    return NextResponse.json({ message: 'Invalid ID or server error' }, { status: 500 });
  }
}
