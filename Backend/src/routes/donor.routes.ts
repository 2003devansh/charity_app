import { Router } from "express";
import {
  createDonation,
  getAllAvailableDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getMyDonations,
} from "../controllers/donor.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

//PUBLIC ROUTES

router.get("/", getAllAvailableDonations);
router.get("/:id", getDonationById);

// AUTHENTICATED ROUTES
router.post("/", authMiddleware, createDonation);
router.get("/me", authMiddleware, getMyDonations);
router.patch("/:id", authMiddleware, updateDonationStatus);
router.delete("/:id", authMiddleware, deleteDonation);

export default router;
