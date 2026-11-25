import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import habitRouter from "./routes/habits.js";
import logRouter from "./routes/logs.js";
import aiRouter from "./routes/ai.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    // Allow requests with no origin (curl, same-origin, server-to-server)
    if (!origin) return cb(null, true);
    // Allow any localhost / 127.0.0.1 origin in development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }
    // Allow anything explicitly listed in CLIENT_URL (comma-separated)
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({limit: "1mb"}));

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/api/health", (_req, res)=>{
    res.json({status: "ok", time: new Date().toDateString()})
});

app.use("/api/auth", authRouter);
app.use("/api/habits", habitRouter);
app.use("/api/logs", logRouter);
app.use("/api/ai", aiRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => console.error("MongoDB connection error:", err.message));
}

