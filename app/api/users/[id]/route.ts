// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/config/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectDB();

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
