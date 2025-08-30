import Url from "../../models/Url.js";
import Event from "../../models/Event.js";

const analyticsOverallHandler = async (req, res) => {
  console.log(`Entered overall handler..`);
  const userId = req.user?.id;

  try {
    const aliasList = await Url.find({ userId }).distinct("alias");
    console.log(aliasList);

    // 1. Total URLs
    const totalUrls = aliasList.length;

    // 2. Total Clicks
    const totalClicks = await Event.countDocuments({
      alias: { $in: aliasList },
    });

    // 3. Unique Users
    const uniqueUsersAgg = await Event.aggregate([
      { $match: { alias: { $in: aliasList }, userId: { $ne: null } } },
      { $group: { _id: "$userId" } },
      { $count: "uniqueUsers" },
    ]);
    const uniqueUsers = uniqueUsersAgg[0]?.uniqueUsers || 0;

    // 4. Clicks by Date (Recent 7)
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

    // 5. OS Type
    const osType = await Event.aggregate([
      { $match: { alias: { $in: aliasList } } },
      {
        $group: {
          _id: "$operatingSystem",
          uniqueClicks: { $sum: 1 },
          uniqueUsers: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          osName: "$_id",
          uniqueClicks: 1,
          uniqueUsers: { $size: "$uniqueUsers" },
        },
      },
    ]);

    // 6. Device Type
    const deviceType = await Event.aggregate([
      { $match: { alias: { $in: aliasList } } },
      {
        $group: {
          _id: "$deviceType",
          uniqueClicks: { $sum: 1 },
          uniqueUsers: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          deviceName: "$_id",
          uniqueClicks: 1,
          uniqueUsers: { $size: "$uniqueUsers" },
        },
      },
    ]);

    res.json({
      totalUrls,
      totalClicks,
      uniqueUsers,
      clicksByDate,
      osType,
      deviceType,
    });
  } catch (error) {
    console.error("Overall Analytics Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch overall analytics", error });
  }
};

export default analyticsOverallHandler;
