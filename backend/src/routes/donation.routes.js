import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createDonation,
  updateDonationStatus,
  riderAction,
  getDonorDonations,
  getRiderDonations,
  getOrganisationDonations
} from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/", auth, createDonation);
router.get("/my", auth, getDonorDonations);
router.get("/rider", auth, getRiderDonations);
router.patch("/:id/rider-action", auth, riderAction);
router.patch("/:id/status", auth, updateDonationStatus);
router.get("/organisation", auth, getOrganisationDonations);

export default router;
