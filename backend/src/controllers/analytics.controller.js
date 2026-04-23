import Click from "../models/click.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;

    const totalClicks = await Click.countDocuments({
      shortCode: code,
    });

    res.json({ totalClicks });
  } catch (err) {
    res.status(500).json({ message: "Analytics error" });
  }
};
