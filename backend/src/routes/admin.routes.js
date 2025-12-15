// routes/admin.router.js
import express from "express";
import { auth } from "../middleware/auth.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", auth, getAdminStats);

export default router;
