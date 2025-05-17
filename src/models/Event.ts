import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: Date, required: true },
  venue: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
