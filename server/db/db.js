import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATA_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const DATA_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "password";
const DATA_PORT = process.env.MONGO_PORT || "27017";
const DATA_DB = process.env.MONGO_INITDB_ROOT_DB || "url_shortener_db";

const URI = `mongodb://${DATA_USERNAME}:${DATA_PASSWORD}@mongodb:${DATA_PORT}`;
console.log(URI);
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
