import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";   // ✅ import your routes
import donationRoutes from "./routes/donation.routes.js";
import adminRoutes from "./routes/admin.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

// ✅ REGISTER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/donations",donationRoutes)
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

export default app;
