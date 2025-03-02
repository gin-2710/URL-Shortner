import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  customAlias: { type: String, required: false },
  topic: { type: String, required: false },
  shortUrl: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, ref: "User", required: false },
});

const Url = mongoose.model("Url", UrlSchema);

export default Url;
