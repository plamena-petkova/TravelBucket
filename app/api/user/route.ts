import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import User from "@/models/User";
import connectDB from "@/config/database";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await User.findById(session.user.id).lean();

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
