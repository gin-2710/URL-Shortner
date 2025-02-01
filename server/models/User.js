import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.UUID, unique: true, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
