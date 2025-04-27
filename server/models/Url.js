import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  isCustomAlias: { type: Boolean, default: false, required: true },
  topic: { type: String, required: false },
  alias: { type: String, unique: true, required: true }, //Primary Key
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, ref: "User", required: false },
});

const Url = mongoose.model("Url", UrlSchema);

export default Url;
