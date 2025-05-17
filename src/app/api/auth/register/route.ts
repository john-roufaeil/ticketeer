import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      passwordHash,
      role: "user",
    });

    const userResponse = {
      _id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    };

    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
