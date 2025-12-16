import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAdminStats,
  getAllDonations,
  getDonationById,
  getAllDonors,
  getDonorById,
  getAllRiders,
  getRiderById,
  getAllOrganisations,
  getOrganisationById
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", getAdminStats);

router.get("/donations", getAllDonations);
router.get("/donations/:id", getDonationById);

router.get("/donors", getAllDonors);
router.get("/donors/:id", getDonorById);

router.get("/riders", getAllRiders);
router.get("/riders/:id", getRiderById);

router.get("/organisations", getAllOrganisations);
router.get("/organisations/:id", getOrganisationById);

export default router;
