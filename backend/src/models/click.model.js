import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  shortCode: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  referrer: String,
});

const Click = mongoose.model("Click", clickSchema);

export default Click;
