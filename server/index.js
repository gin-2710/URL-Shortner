import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Url, User, Event } from "./models/index.js";

const app = express();

const PORT = dotenv.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});
