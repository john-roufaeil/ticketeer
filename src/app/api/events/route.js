import dbConnect from "@/app/lib/mongodb";

import Event from "@/models/Event";

export async function GET() {
  await dbConnect();
  const events = await Event.find();
  return Response.json(events);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const event = await Event.create(data);
  return Response.json(event);
}
