import Url from "../../models/Url.js";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

const shortenHandler = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Request body is required" });

  const { longUrl, customAlias, topic } = req.body;

  if (!longUrl)
    return res.status(400).json({ message: "Long URL is required" });

  const alias = customAlias
    ? customAlias
    : nanoid(
        6,
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      );

  const url = new Url({
    longUrl,
    isCustomAlias: !!customAlias,
    topic,
    alias,
    createdAt: new Date(),
    userId: req.user?.id || null,
  });

  try {
    await url.save();
    res.status(201).json({
      shortUrl: process.env.SHORT_URL_BASE + alias,
      createdAt: url.createdAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Alias already exists. Choose a different one." });
    }

    res.status(500).json({ message: "Error saving Short URL", error });
  }
};

export default shortenHandler;
