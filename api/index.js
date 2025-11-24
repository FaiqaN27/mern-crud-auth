import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://mern-crud-auth-steel.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//Mongo DB connection (optimized for serverless)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    isConnected = conn.connection.readyState;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error: ", err);
  }
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
