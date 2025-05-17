import { dbConnect } from '@/lib/dbConnect';
import Booking from '@/models/Booking';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const booking = await Booking.create(data);
    return Response.json(booking);
}

export async function GET() {
    await dbConnect();
    const bookings = await Booking.find();
    return Response.json(bookings);
}