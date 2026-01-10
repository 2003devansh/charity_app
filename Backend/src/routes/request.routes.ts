import express from "express";
import {
  createRequest,
  getMyRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * AUTHENTICATED ROUTES
 */
router.post("/", authMiddleware, createRequest);
router.get("/myrequests", authMiddleware, getMyRequests);
router.patch("/:id", authMiddleware, updateRequest);
router.delete("/:id", authMiddleware, deleteRequest);

/**
 * PUBLIC ROUTE
 */
router.get("/:id", getRequestById);

export default router;
