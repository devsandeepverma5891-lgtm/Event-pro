import { Router } from "express";
import {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  checkInVisitor,
  checkOutVisitor
} from "../controllers/VisitorController.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = Router();

// Self-registration (no auth required)
router.post("/register", createVisitor);

// Admin/manager CRUD (auth required)
router.post("/", ensureAuthenticated, createVisitor);
router.get("/", ensureAuthenticated, getVisitors);
router.get("/:id", ensureAuthenticated, getVisitorById);
router.put("/:id", ensureAuthenticated, updateVisitor);
router.delete("/:id", ensureAuthenticated, deleteVisitor);

// Check-in / Check-out (auth required)
router.post("/:id/checkin", ensureAuthenticated, checkInVisitor);
router.post("/:id/checkout", ensureAuthenticated, checkOutVisitor);

export default router;
