
import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/config/database';

export async function GET() {
  try {
    // Connect to the DB
    await connectDB();

    // Fetch the first user from the database (or modify this as needed)
    const user = await User.findOne({}); // For example, fetching the first user

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data as JSON
    return NextResponse.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}
