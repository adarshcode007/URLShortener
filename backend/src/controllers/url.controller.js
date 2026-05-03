import redis from "../config/redis.js";
import Click from "../models/click.model.js";
import Url from "../models/url.model.js";
import { processAnalytics } from "../services/analytics.service.js";
import { generateCode } from "../utils/generateCode.js";

export const createUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    let shortCode = generateCode();

    // ensure uniqueness
    while (await Url.findOne({ shortCode })) {
      shortCode = generateCode();
    }

    const url = await Url.create({
      userId: req.user.id,
      shortCode,
      longUrl,
    });

    res.json(url);
  } catch (error) {
    res.status(500).json({ message: "Failed to create URL" });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    const codes = urls.map((u) => u.shortCode);

    const clickData = await Click.aggregate([
      { $match: { shortCode: { $in: codes } } },
      {
        $group: {
          _id: "$shortCode",
          count: { $sum: 1 },
        },
      },
    ]);

    // convert to map for easy lookup
    const clickMap = {};
    clickData.forEach((c) => {
      clickMap[c._id] = c.count;
    });

    // attach click counts to urls
    const result = urls.map((url) => ({
      ...url.toObject(),
      clicks: clickMap[url.shortCode] || 0,
    }));

    res.json(result);
  } catch (err) {
    console.error("GET URL ERROR:", err);
    res.status(500).json({ message: "Failed to fetch URLs" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    // 1. Check redis cache first
    const cachedurl = await redis.get(code);

    if (cachedurl) {
      processAnalytics(code, req); // async tracking
      return res.redirect(cachedurl);
    }

    // 2. DB fallback
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    // 3. Cache it
    await redis.set(code, url.longUrl, "EX", 60 * 60);

    processAnalytics(code, req);

    res.redirect(url.longUrl);
  } catch (err) {
    console.error("REDIRECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await Url.findOne({ _id: id, userId: req.user.id });

    if (!url) {
      return res.status(404).json({ message: "URL not found or unauthorized" });
    }

    // 1. Delete clicks
    await Click.deleteMany({ shortCode: url.shortCode });

    // 2. Delete URL from DB
    await Url.findByIdAndDelete(id);

    // 3. Remove from Redis cache
    await redis.del(url.shortCode);

    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    console.error("DELETE URL ERROR:", err);
    res.status(500).json({ message: "Failed to delete URL" });
  }
};
