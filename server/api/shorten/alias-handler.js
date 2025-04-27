import Url from "../../models/Url.js";
import Event from "../../models/Event.js";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config();

function getDeviceType(userAgent) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return isMobile ? "mobile" : "desktop";
}

async function logEvent(userID, userIP, userOS) {
  const event = new Event({
    id: uuid(),
    ip: userIP,
    deviceType: getDeviceType,
    shortUrl: `${process.env.SHORT_URL_BASE}` + req.params.alias,
    operatingSystem: userOS,
    userId: userID,
    eventTs: new Date().toISOString(),
  });

  try {
    event.save();
  } catch {
    res.status(500).json({ message: "Error saving event" });
  }
}

const shortenAliasHandler = (req, res) => {
  Url.findOne({ customAlias: req.params.alias }, async (err, url) => {
    if (err) {
      res.status(404).json({ message: `Alias ${req.params.alias} not found` });
    } else {
      await logEvent(req.userId, req.userIP, req.userOS);
      res.redirect(url.longUrl);
    }
  });
};

export default shortenAliasHandler;
