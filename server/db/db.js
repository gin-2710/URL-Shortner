import { MongoClient } from "mongodb";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const DATA_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const DATA_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "password";
const DATA_PORT = process.env.MONGO_PORT || "27017";
const DATA_DB = process.env.MONGO_INITDB_ROOT_DB || "url_shortener_db";

const URI = `mongodb://${DATA_USERNAME}:${DATA_PASSWORD}@mongodb:${DATA_PORT}`;
console.log(URI);
const client = new MongoClient(URI);

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(DATA_DB);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  } finally {
    console.log("Attempting to close MongoDB connection");
    await client.close();
  }
}

const db = await connectToDatabase();

export default db;
