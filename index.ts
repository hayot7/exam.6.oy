import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

async function start() {
  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);

  let dbConnected = false;

  try {
    await connectDB();
    dbConnected = true;
  } catch (err) {
    console.error("DB connection error:", err);
  }

  app.listen(PORT, () => {
    const dbMsg = dbConnected ? "Connected to DB" : "DB not connected";
    console.log(`Server running at: ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
