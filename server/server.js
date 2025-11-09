import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

dotenv.config();

const app = express();

// ✅ connect to MongoDB
await connectDB();

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

// Health route
app.get("/", (req, res) => res.send("✅ Backend running"));

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend connected successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
