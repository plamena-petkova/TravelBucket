import { NextResponse } from "next/server";
import User from "@/models/User";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("Data", request);
try {
  const { name, email, password } = await request.json();

  if (!email || !name || !password) {
    return new NextResponse("Missing email, name or password", { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "success" });
} catch (error) {
  console.error("Server Error:", error);
  return new NextResponse("Internal Server Error", { status: 500 });
}
}
