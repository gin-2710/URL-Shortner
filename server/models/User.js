import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: uuidv4 }, // Store UUID as a string
  email: { type: String, required: true, unique: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
