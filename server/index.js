import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "./models/Event.js";
import Url from "./models/Url.js";
import User from "./models/User.js";

const app = express();

const PORT = dotenv.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});
