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
    const urls = (await Url.find({ userId: req.user.id })).toSorted({
      createdAt: -1,
    });

    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: "Faied to fetch URLs" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    // 1. Check redis cache first
    const cachedurl = await redis.get(code);

    if (cachedUrl) {
      processAnalytics(code, req); // async tracking
      return res.redirect(cachedUrl);
    }

    // 2. DB fallback
    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    // 3. Cache it
    await redis.set(code, url.longUrl, "EX", 60 * 60);

    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
