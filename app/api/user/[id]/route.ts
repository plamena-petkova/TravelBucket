import connectDB from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = await params;

  try {
    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = await params;
  const body = await request.json();

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log('User', updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
}
