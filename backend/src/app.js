import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";   // ✅ import your routes

const app = express();

app.use(cors());
app.use(express.json());

// ✅ REGISTER ROUTES
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

export default app;
