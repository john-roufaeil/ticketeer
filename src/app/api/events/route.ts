import dbConnect from "@/app/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  try {
    const event = await Event.create({
      nameEN: body.nameEN,
      nameAR: body.nameAR,
      descriptionEN: body.descriptionEN,
      descriptionAR: body.descriptionAR,
      categoryEN: body.categoryEN,
      categoryAR: body.categoryAR,
      venue: body.venue,
      price: body.price,
      date: body.date,
      image: body.image,
    });

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
