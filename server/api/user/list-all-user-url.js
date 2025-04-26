import Url from "../../models/Url.js";

const listAllUserUrl = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const userUrls = await Url.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(userUrls);
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    res.status(500).json({ message: "Server error while fetching URLs" });
  }
};

export default listAllUserUrl;
