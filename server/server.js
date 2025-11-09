import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import { parse as dotenvParse } from "dotenv";
import { connectDB } from "./config/db.js"; // ✅ named import
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

// Silent .env loading to avoid library console messages
try {
  if (fs.existsSync('.env')) {
    const parsed = dotenvParse(fs.readFileSync('.env'));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
} catch {
  // ignore
}

const app = express();

// ✅ connect to MongoDB
await connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend connected successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
