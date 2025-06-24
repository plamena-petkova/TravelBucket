import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/config/database';

export async function GET() {

  try {
    await connectDB();

    const user = await User.find().lean();

    if (!user) {
      return NextResponse.json({ message: 'No users' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
