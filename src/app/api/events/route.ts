import dbConnect from "@/app/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find();
    return Response.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const event = await Event.create(data);
  return Response.json(event);
}
