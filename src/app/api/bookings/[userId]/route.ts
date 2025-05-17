import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const { userId } = params;

    const bookings = await Booking.find({ userId }).populate("eventId");

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
