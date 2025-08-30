import Event from "../../models/Event.js";
import Url from "../../models/Url.js";

const topicBasedAnalyticsHandler = async (req, res) => {
  const topic = req.params.topic;

  try {
    const aliasList = await Url.find({ topic }).distinct("alias");

    if (aliasList.length === 0)
      return res.status(404).json({ message: "No URLs found for topic" });

    // 1. Total Clicks
    const totalClicks = await Event.countDocuments({
      alias: { $in: aliasList },
    });

    // 2. Unique Users
    const uniqueUsersAgg = await Event.aggregate([
      { $match: { alias: { $in: aliasList }, userId: { $ne: null } } },
      { $group: { _id: "$userId" } },
      { $count: "uniqueUsers" },
    ]);
    const uniqueUsers = uniqueUsersAgg[0]?.uniqueUsers || 0;

    // 3. Clicks by Date (Recent 7)
    const clicksByDate = await Event.aggregate([
      { $match: { alias: { $in: aliasList } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$eventTs" } },
          totalClicks: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
    ]);

    // 4. Per-URL Breakdown
    const urlAnalytics = await Event.aggregate([
      { $match: { alias: { $in: aliasList } } },
      {
        $group: {
          _id: "$alias",
          totalClicks: { $sum: 1 },
          uniqueUsers: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          shortUrl: { $concat: [process.env.SHORT_URL_BASE, "$_id"] },
          totalClicks: 1,
          uniqueUsers: { $size: "$uniqueUsers" },
        },
      },
    ]);

    res.json({
      totalClicks,
      uniqueUsers,
      clicksByDate,
      urls: urlAnalytics,
    });
  } catch (error) {
    console.error("Topic Analytics Error:", error);
    res.status(500).json({ message: "Failed to fetch topic analytics", error });
  }
};

export default topicBasedAnalyticsHandler;
