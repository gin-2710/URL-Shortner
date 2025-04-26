import Url from "../../models/Url.js";
import Event from "../../models/Event.js";
import uuidv4 from "uuid";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function getDeviceType(userAgent) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  return isMobile ? "mobile" : "desktop";
}

async function logEvent(userId) {
  const resIp = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IP_ADDRESS_GEO_LOC_API_KEY}`);
  console.log("Response IP: ", resIp);

  const event = new Event({
    id: uuidv4(),
    ip: resIp.data.ipAddress,
    deviceType: "mobile", //get device type,
    
    shortUrl: `${process.env.SHORT_URL_BASE}` + req.params.alias,
//    operatingSystem: get operating system
    userId: userId,
    eventTs: new Date().toISOString()
  })
}
const shortenAliasHandler = (req, res) => {
  Url.findOne({ customAlias: req.params.alias }, (err, url) => {
    if (err) {
      res.status(404).json({ message: "URL not found" });
    } else {

      res.redirect(url.longUrl);
    }
  });
};

export default shortenAliasHandler;
