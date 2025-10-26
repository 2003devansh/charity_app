import { Router } from "express";
import {
  getAvailableTask,
  acceptTask,
  getMyTask,
  updateTaskStatus,
} from "../controllers/volenteer.controller";

const router = Router();

// ✅ 1. Get all available tasks (CLAIMED donations)
router.get("/tasks", getAvailableTask);

// ✅ 2. Accept a task (assign volunteer to a donation)
router.post("/tasks/accept", acceptTask);

// ✅ 3. Get tasks assigned to the volunteer
router.get("/tasks/my", getMyTask);

// ✅ 4. Update task status (PENDING → COMPLETED)
router.patch("/tasks/:taskId", updateTaskStatus);

export default router;
