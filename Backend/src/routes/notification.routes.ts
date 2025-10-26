import express from "express";
import {
  createNotification,
  getUserNotification,
  markAsRead,
  deleteNotification,
  clearAllnotifications,
} from "../controllers/notification.controller";

const router = express.Router();

router.post("/", createNotification);
router.get("/:userId", getUserNotification);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);
router.delete("/clear/:userId", clearAllnotifications);

export default router;
