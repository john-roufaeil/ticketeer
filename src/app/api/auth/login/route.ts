import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/app/lib/mongodb";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "24h",
  });

  console.log("Token:", token);
  return NextResponse.json({
    token,
    user: { ...user, passwordHash: undefined },
  });
}
