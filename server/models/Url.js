import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  customAlias: { type: String, required: false },
  topic: { type: String, required: false },
  shortUrl: { type: String, unique: true, required: true }, //Primary Key
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.UUID, ref: "User", required: false },
});

const Url = mongoose.model("Url", UrlSchema);

export default Url;
