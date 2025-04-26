import express from "express";
import Url from "../../models/Url.js";

const shortenAliasHandler = express.Router();

// Handle redirection for short URLs
shortenAliasHandler.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;

    // Find the URL in the database
    const urlEntry = await Url.findOne({
      shortUrl: process.env.SHORT_URL_BASE + shortUrl,
    });

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Redirect to the long URL
    res.redirect(urlEntry.longUrl);
  } catch (error) {
    console.error("Error handling short URL:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default shortenAliasHandler;
