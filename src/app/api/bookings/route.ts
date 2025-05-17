import dbConnect from "@/app/lib/mongodb";
import Booking from "@/models/Booking";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    await dbConnect();
    const data = await req.json();
    const booking = await Booking.create(data);
    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    await dbConnect();
    const bookings = await Booking.find();
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}
