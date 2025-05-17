import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(_, { params }) {
    await dbConnect();
    const user = await User.findById(params.id).select('-passwordHash');
    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return Response.json(user);
}
