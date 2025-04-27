import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.UUID, unique: true, required: true },
  ip: { type: String, required: false },
  deviceType: { type: String, required: false },
  alias: { type: String, ref: "Url", required: true },
  operatingSystem: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.UUID, ref: "User", required: false },
  eventTs: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
