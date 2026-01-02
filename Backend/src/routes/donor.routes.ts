import { Router } from "express";
import {
  createDonation,
  AllDonation,
  getDonationbyId,
  updateDonation,
  deleteDonation,
  getAllDonationByLoggedInUser,
} from "../controllers/donor.controller";

const router = Router();

// Create a new donation
router.post("/", createDonation);

// Get all available donations
router.get("/", AllDonation);

// Get a specific donation by ID
router.get("/:id", getDonationbyId);

// Update donation status
router.patch("/:id", updateDonation);

// Delete a donation (only donor)
router.delete("/:id", deleteDonation);

// Get all the donation for logedIn user
router.get("/getAllDonation", getAllDonationByLoggedInUser);

export default router;
