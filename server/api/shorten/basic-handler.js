import Url from "../../models/Url.js";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

//write a function to validate if longUrl exists
const shortenHandler = (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Request body is required" });

  const { longUrl, customAlias, topic } = req.body;

  if (!longUrl)
    return res.status(400).json({ message: "Long URL is required" });

  const url = new Url({
    longUrl: longUrl,
    isCustomAlias: customAlias ? true : false,
    topic: topic,
    alias: customAlias
      ? customAlias
      : nanoid(
          6,
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        ),
    createdAt: new Date(),
    userId: req.user.id,
  });

  try {
    url.save();
  } catch (error) {
    res.status(500).json({ message: "Error saving Short URL" });
  }

  res.status(201).json({
    shortUrl: process.env.SHORT_URL_BASE + url.alias,
    createdAt: url.createdAt,
  });
};

export default shortenHandler;
