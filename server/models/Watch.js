import mongoose from "mongoose";

const WatchSchema = new mongoose.Schema({
  userId: String,
  date: String,
  site: String,
  minutes: Number
});

export default mongoose.model("Watch", WatchSchema);