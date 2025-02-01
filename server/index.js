import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./api/routes.js";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();
const PORT = dotenv.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api", apiRoutes);
