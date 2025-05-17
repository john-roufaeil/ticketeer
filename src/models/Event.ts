import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  nameEN: { type: String, required: true },
  nameAR: { type: String, required: true },

  descriptionEN: { type: String },
  descriptionAR: { type: String },

  categoryEN: { type: String },
  categoryAR: { type: String },

  date: { type: Date, required: true },
  venue: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
