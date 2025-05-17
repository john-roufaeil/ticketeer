import dbConnect from "@/app/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();
  console.log("Fetching event with ID:", id);
  try {
    const event = await Event.findById(id);
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    return NextResponse.json(event);
  } catch (err) {
    return new Response("Invalid product ID: " + err, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();
  const data = await req.json();
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(event);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
