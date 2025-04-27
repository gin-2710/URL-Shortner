const analyticsAliasHandler = async (req, res) => {
  try {
    const alias = req.params.alias;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Prepare 4 parallel aggregation queries
    const [
      totalClicksAndUniqueUsers,
      clicksByDate,
      osTypeSummary,
      deviceTypeSummary,
    ] = await Promise.all([
      // 1. Total Clicks and Unique Users
      Event.aggregate([
        { $match: { alias: alias } },
        {
          $group: {
            _id: null,
            totalClicks: { $sum: 1 },
            uniqueUsers: {
              $addToSet: {
                $cond: [{ $ifNull: ["$userId", false] }, "$userId", "$$REMOVE"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalClicks: 1,
            uniqueUsers: { $size: "$uniqueUsers" },
          },
        },
      ]),

      // 2. Clicks by Date (last 7 days)
      Event.aggregate([
        {
          $match: {
            alias: alias,
            eventTs: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$eventTs" } },
            clickCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            clickCount: 1,
          },
        },
        { $sort: { date: 1 } },
      ]),

      // 3. OS Type summary
      Event.aggregate([
        { $match: { alias: alias } },
        {
          $group: {
            _id: "$operatingSystem",
            uniqueClicks: { $sum: 1 },
            uniqueUsers: {
              $addToSet: {
                $cond: [{ $ifNull: ["$userId", false] }, "$userId", "$$REMOVE"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            osName: "$_id",
            uniqueClicks: 1,
            uniqueUsers: { $size: "$uniqueUsers" },
          },
        },
      ]),

      // 4. Device Type summary
      Event.aggregate([
        { $match: { alias: alias } },
        {
          $group: {
            _id: "$deviceType",
            uniqueClicks: { $sum: 1 },
            uniqueUsers: {
              $addToSet: {
                $cond: [{ $ifNull: ["$userId", false] }, "$userId", "$$REMOVE"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            deviceName: "$_id",
            uniqueClicks: 1,
            uniqueUsers: { $size: "$uniqueUsers" },
          },
        },
      ]),
    ]);

    // Send response
    return res.status(200).json({
      totalClicks: totalClicksAndUniqueUsers[0]?.totalClicks || 0,
      uniqueUsers: totalClicksAndUniqueUsers[0]?.uniqueUsers || 0,
      clicksByDate,
      osType: osTypeSummary,
      deviceType: deviceTypeSummary,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default analyticsAliasHandler;
