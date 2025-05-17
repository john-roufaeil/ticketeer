import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    await dbConnect();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({ userId }).populate("eventId");

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
