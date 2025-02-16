import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATA_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const DATA_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "password";
const DATA_PORT = process.env.MONGO_PORT || "27017";
const DATA_DB = process.env.MONGO_DATABASE || "mydatabase";

const URI = `mongodb://${DATA_USERNAME}:${DATA_PASSWORD}@mongodb:${DATA_PORT}/${DATA_DB}?authSource=admin`;
console.log(URI);
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
