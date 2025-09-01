import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Watch from "./models/Watch.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: "*",  // for testing, allow everything
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// save watch time
app.post("/api/watch", async (req, res) => {
  const { userId, site, time } = req.body;
  const date = new Date().toISOString().split("T")[0];

  let entry = await Watch.findOne({ userId, date, site });
  if (!entry) entry = new Watch({ userId, date, site, minutes: 0 });

  entry.minutes += time / 60000;
  await entry.save();

  res.json({ success: true });
});

// get stats
app.get("/api/stats/:userId", async (req, res) => {
  let stats = await Watch.find({ userId: req.params.userId });
  res.json(stats);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));