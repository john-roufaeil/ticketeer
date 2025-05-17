import dbConnect from "@/app/lib/mongodb";
import Event from '@/models/Event';

export async function GET(_, { params }) {
    await dbConnect();
    const event = await Event.findById(params.id);
    return Response.json(event);
}

export async function PUT(req, { params }) {
    await dbConnect();
    const data = await req.json();
    const event = await Event.findByIdAndUpdate(params.id, data, { new: true });
    return Response.json(event);
}

export async function DELETE(_, { params }) {
    await dbConnect();
    await Event.findByIdAndDelete(params.id);
    return Response.json({ success: true });
}
