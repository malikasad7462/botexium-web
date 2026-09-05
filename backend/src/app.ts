import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes";

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://botexium.com",
    "https://botexim-web.pages.dev",
  ],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;