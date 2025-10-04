import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Routes
router.post("/", protect, createTask);      // Create a new task
router.get("/", protect, getTasks);         // Get all tasks
router.get("/stats", protect, getTaskStats); // Get tasks stats

router.get("/:id", protect, getTask);       // Get one task by id
router.put("/:id", protect, updateTask);    // Update task by id
router.delete("/:id", protect, deleteTask); // Delete task by id

export default router;
