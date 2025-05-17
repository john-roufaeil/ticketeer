import dbConnect from "@/app/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

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
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role?: string;
    };
    console.log("Payload:", payload);

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden - Admins only" },
        { status: 403 }
      );
    }

    await dbConnect();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}
