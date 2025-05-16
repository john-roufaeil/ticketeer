import mongoose from 'mongoose';
// import User from "@/models/User";
// import Order from "@/models/Order";
// import Product from "@/models/Product";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is undefined.');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    // mongoose.model("User");
    // mongoose.model("Order");
    // mongoose.model("Product");
    console.log("MongoDB connected");
    return cached.conn;
}

export default dbConnect;
