import { Router } from "express";
import {
  getAvailableDonation,
  claimDonation,
  getMydonation,
} from "../controllers/recipient.controller";

const router = Router();

// Get all available donations (public view)
router.get("/available", getAvailableDonation);

// Claim a donation (recipient action)
router.patch("/claim/:id", claimDonation);

// Get all donations claimed by a recipient
router.get("/my-donations/:recipientId", getMydonation);

export default router;
