import Click from "../models/click.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;

    // Total clicks
    const totalClicks = await Click.countDocuments({
      shortCode: code,
    });

    // Referrer breakdown
    const referrerStats = await Click.aggregate([
      { $match: { shortCode: code } },
      {
        $group: {
          _id: "$referrer",
          count: { $sum: 1 },
        },
      },
    ]);

    // Device breakdown
    const deviceStats = await Click.aggregate([
      { $match: { shortCode: code } },
      {
        $group: {
          _id: "$userAgent",
          count: { $sum: 1 },
        },
      },
    ]);

    // Daily clicks
    const dailyClicks = await Click.aggregate([
      { $match: { shortCode: code } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$timestamp",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ totalClicks, referrerStats, deviceStats, dailyClicks });
  } catch (err) {
    res.status(500).json({ message: "Analytics error" });
  }
};
