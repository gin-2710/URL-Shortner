import Url from "../../models/Url.js";
import Event from "../../models/Event.js";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import redisClient from "../../cache/cache.js";

dotenv.config();

function getDeviceType(userAgent) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  return isMobile ? "mobile" : "desktop";
}

async function logEvent(userID, userIP, userOS, alias) {
  const event = new Event({
    id: uuid(),
    ip: userIP,
    deviceType: getDeviceType(),
    alias: alias,
    operatingSystem: userOS,
    userId: userID,
    eventTs: new Date().toISOString(),
  });

  try {
    await event.save();
  } catch {
    res.status(500).json({ message: "Error saving event" });
  }
}

async function cacheReadWrite(alias) {
  let value = await redisClient.get(alias);

  if (value == null) {
    let data = await Url.findOne({ alias: alias }).exec();

    if (data == null) return null;

    value = data.longUrl;
    await redisClient.set(alias, value);
  }

  return value;
}

const shortenAliasHandler = async (req, res) => {
  const data = await cacheReadWrite(req.params.alias);

  if (data == null) {
    res.status(404).json({ message: `Alias ${req.params.alias} not found` });
  } else {
    await logEvent(req.userId, req.userIP, req.userOS, req.params.alias);
    res.redirect(data);
  }
};

export default shortenAliasHandler;
