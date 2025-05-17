import dbConnect from "@/app/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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

// export async function GET(request: NextRequest) {
//   const { pathname } = new URL(request.url);
//   const id = pathname.split("/").pop();

//   await dbConnect();
//   const event = await Event.findById(id);

//   if (!event) {
//     return new Response(JSON.stringify({ error: "Event not found" }), {
//       status: 404,
//     });
//   }

//   return Response.json(event);
// }
export async function PUT(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  await dbConnect();
  const data = await request.json();
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  return Response.json(event);
}

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  await dbConnect();
  await Event.findByIdAndDelete(id);
  return Response.json({ success: true });
}
