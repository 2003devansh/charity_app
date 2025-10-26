import express from "express";
import {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controllers/request.controller";

const router = express.Router();

// ✅ Create a new request
router.post("/", createRequest);

// ✅ Get all requests made by a recipient
router.get("/myrequests", getMyRequests);

// ✅ Get specific request by ID
router.get("/:id", getRequestById);

// ✅ Update request status (e.g., FULFILLED)
router.patch("/:id", updateRequest);

// ✅ Delete a request
router.delete("/:id", deleteRequest);

export default router;
